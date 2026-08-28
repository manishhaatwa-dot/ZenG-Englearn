
// =========================================================
// ZenG English Learn
// Chat Page
// =========================================================
//
// Complete user-to-user English chat system.
//
// Features:
// - Chat inbox
// - Registered learner list
// - Recent chats first
// - Real-time conversations
// - Real-time unread indicator
// - New-message alert while chat is open
// - Send messages
// - Sent / seen ticks
// - Message editing
// - Message menu
// - User blocking
// - Clear chat
// - Firebase message deletion
// - Stable chat IDs
// - Dashboard navigation
// - Atomic message + chat update
//
// Firestore:
//
// zeng_englearn_users/{uid}
//
// chats/{chatId}
//   participants
//   lastMessage
//   lastMessageAt
//   lastSenderId
//   unreadFor
//   updatedAt
//
// chats/{chatId}/messages/{messageId}
//   senderId
//   receiverId
//   text
//   createdAt
//   updatedAt
//   edited
//   seen
//   seenAt
//
// =========================================================


// =========================================================
// FIREBASE
// =========================================================

import {
  collection,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  db,
  auth
} from "../firebase-services.js";


// =========================================================
// CONSTANTS
// =========================================================

const USERS_COLLECTION =
  "zeng_englearn_users";

const CHATS_COLLECTION =
  "chats";

const MESSAGES_SUBCOLLECTION =
  "messages";

const MAX_MESSAGE_LENGTH =
  2000;

const FIRESTORE_BATCH_LIMIT =
  450;


// =========================================================
// STATE
// =========================================================

const ChatState = {

  currentUser: null,

  currentProfile: null,

  selectedUser: null,

  selectedChatId: null,

  users: [],

  conversations: {},

  unsubscribeUsers: null,

  unsubscribeMessages: null,

  unsubscribeConversationList: null,

  editingMessageId: null,

  blockedUsers: new Set(),

  view: "inbox",

  lastRenderedMessageCount: 0,

  newMessageAlertVisible: false

};


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {

  return String(value ?? "")

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


// =========================================================
// CURRENT USER
// =========================================================

function getCurrentUser() {

  return auth.currentUser || null;

}


// =========================================================
// CHAT ID
// =========================================================

function getParticipantIds(
  uid1,
  uid2
) {

  return [
    String(uid1),
    String(uid2)
  ].sort();

}


function getChatId(
  uid1,
  uid2
) {

  return getParticipantIds(
    uid1,
    uid2
  ).join("_");

}


// =========================================================
// CLEANUP LISTENERS
// =========================================================

function cleanupChatListeners() {

  if (
    ChatState.unsubscribeUsers
  ) {

    ChatState.unsubscribeUsers();

    ChatState.unsubscribeUsers =
      null;

  }


  if (
    ChatState.unsubscribeMessages
  ) {

    ChatState.unsubscribeMessages();

    ChatState.unsubscribeMessages =
      null;

  }


  if (
    ChatState.unsubscribeConversationList
  ) {

    ChatState.unsubscribeConversationList();

    ChatState.unsubscribeConversationList =
      null;

  }

}


// =========================================================
// CLEANUP MESSAGE LISTENER ONLY
// =========================================================

function cleanupMessageListener() {

  if (
    ChatState.unsubscribeMessages
  ) {

    ChatState.unsubscribeMessages();

    ChatState.unsubscribeMessages =
      null;

  }

}


// =========================================================
// ENSURE CHAT STYLES
// =========================================================

function ensureChatStyles() {

  if (
    document.getElementById(
      "zengChatPageStyles"
    )
  ) {

    return;

  }


  const style =
    document.createElement(
      "style"
    );


  style.id =
    "zengChatPageStyles";


  style.textContent = `

    /* =====================================================
       CHAT PAGE
       ===================================================== */

    .zeng-chat-page {

      width:min(100%,760px);

      margin:0 auto;

    }


    /* =====================================================
       BACK BUTTON
       ===================================================== */

    .zeng-chat-back {

      border:none;

      background:transparent;

      color:var(--primary);

      font-size:13px;

      font-weight:750;

      cursor:pointer;

      padding:6px 0;

    }


    /* =====================================================
       INBOX HEADER
       ===================================================== */

    .zeng-chat-header {

      margin-top:10px;

      padding:18px;

    }


    .zeng-inbox-title-row {

      display:flex;

      align-items:center;

      justify-content:space-between;

      gap:10px;

    }


    .zeng-inbox-title {

      font-size:19px;

      font-weight:850;

    }


    .zeng-inbox-subtitle {

      margin-top:4px;

      color:var(--text-secondary);

      font-size:10px;

      line-height:1.5;

    }


    /* =====================================================
       USER LIST
       ===================================================== */

    .zeng-user-list {

      display:flex;

      flex-direction:column;

      gap:7px;

      margin-top:14px;

    }


    .zeng-user-card {

      width:100%;

      border:none;

      text-align:left;

      cursor:pointer;

      padding:12px;

      display:flex;

      align-items:center;

      gap:11px;

      position:relative;

    }


    .zeng-user-card:hover {

      transform:translateY(-1px);

    }


    .zeng-user-avatar {

      width:45px;

      height:45px;

      min-width:45px;

      border-radius:50%;

      background:#fff0f5;

      display:flex;

      align-items:center;

      justify-content:center;

      font-size:21px;

      overflow:hidden;

    }


    .zeng-user-info {

      min-width:0;

      flex:1;

    }


    .zeng-user-name-row {

      display:flex;

      align-items:center;

      gap:7px;

      min-width:0;

    }


    .zeng-user-name {

      font-size:14px;

      font-weight:800;

      white-space:nowrap;

      overflow:hidden;

      text-overflow:ellipsis;

    }


    .zeng-user-status {

      margin-top:2px;

      color:var(--text-secondary);

      font-size:10px;

    }


    .zeng-user-preview {

      margin-top:4px;

      color:var(--text-muted);

      font-size:11px;

      white-space:nowrap;

      overflow:hidden;

      text-overflow:ellipsis;

    }


    .zeng-user-right {

      display:flex;

      flex-direction:column;

      align-items:flex-end;

      justify-content:center;

      gap:6px;

      flex-shrink:0;

      min-width:38px;

    }


    .zeng-user-time {

      color:var(--text-muted);

      font-size:9px;

      white-space:nowrap;

    }


    /* =====================================================
       UNREAD
       ===================================================== */

    .zeng-unread-dot {

      width:10px;

      height:10px;

      min-width:10px;

      border-radius:50%;

      background:#e53935;

      display:block;

    }


    .zeng-new-message-badge {

      width:9px;

      height:9px;

      min-width:9px;

      border-radius:50%;

      background:#e53935;

      display:inline-block;

      flex-shrink:0;

    }


    .zeng-online-dot {

      width:7px;

      height:7px;

      border-radius:50%;

      background:#26a269;

      display:inline-block;

      margin-right:4px;

    }


    /* =====================================================
       EMPTY
       ===================================================== */

    .zeng-chat-empty {

      padding:30px 18px;

      text-align:center;

      color:var(--text-secondary);

      font-size:12px;

      line-height:1.6;

    }


    .zeng-chat-loading {

      padding:30px;

      text-align:center;

      color:var(--text-secondary);

      font-size:12px;

    }


    /* =====================================================
       CONVERSATION
       ===================================================== */

    .zeng-conversation {

      display:flex;

      flex-direction:column;

      height:calc(100dvh - 40px);

      min-height:450px;

    }


    /* =====================================================
       CONVERSATION HEADER
       ===================================================== */

    .zeng-conversation-header {

      padding:10px;

      display:flex;

      align-items:center;

      gap:9px;

      border-radius:16px;

      background:#fff0f5;

      box-shadow:
        var(
          --shadow,
          0 2px 12px rgba(0,0,0,.06)
        );

      position:relative;

      flex-shrink:0;

    }


    .zeng-conversation-back {

      border:none;

      background:transparent;

      cursor:pointer;

      font-size:21px;

      padding:5px;

      color:var(--text);

    }


    .zeng-conversation-user {

      flex:1;

      min-width:0;

    }


    .zeng-conversation-name {

      font-weight:850;

      font-size:15px;

      white-space:nowrap;

      overflow:hidden;

      text-overflow:ellipsis;

    }


    .zeng-conversation-status {

      margin-top:2px;

      color:var(--text-secondary);

      font-size:10px;

    }


    .zeng-conversation-menu {

      border:none;

      background:transparent;

      cursor:pointer;

      font-size:22px;

      padding:5px 8px;

    }


    /* =====================================================
       CHAT MENU
       ===================================================== */

    .zeng-chat-menu-panel {

      position:absolute;

      right:10px;

      top:54px;

      z-index:30;

      min-width:175px;

      padding:6px;

      border-radius:13px;

      background:#fff0f5;

      box-shadow:
        0 8px 30px rgba(0,0,0,.15);

      display:none;

    }


    .zeng-chat-menu-panel.open {

      display:block;

    }


    .zeng-chat-menu-item {

      width:100%;

      border:none;

      background:transparent;

      text-align:left;

      padding:11px;

      border-radius:9px;

      cursor:pointer;

      font-size:12px;

      color:var(--text);

    }


    .zeng-chat-menu-item:hover {

      background:#ffe4ef;

    }


    .zeng-chat-menu-item.danger {

      color:#d32f2f;

    }


    /* =====================================================
       MESSAGES
       ===================================================== */

    .zeng-messages {

      flex:1;

      overflow-y:auto;

      padding:12px 3px 8px;

      display:flex;

      flex-direction:column;

      gap:6px;

      overscroll-behavior:contain;

    }


    .zeng-message-row {

      display:flex;

      width:100%;

      padding:0 2px;

    }


    .zeng-message-row.mine {

      justify-content:flex-end;

    }


    .zeng-message-row.theirs {

      justify-content:flex-start;

    }


    .zeng-message {

      max-width:min(82%,520px);

      padding:7px 9px 6px;

      border-radius:15px;

      position:relative;

      line-height:1.35;

      box-sizing:border-box;

      word-break:break-word;

    }


    .zeng-message.mine {

      background:#79cfc5;

      color:white;

      border-bottom-right-radius:5px;

    }


    .zeng-message.theirs {

      background:#fff0f5;

      color:var(--text);

      border:1px solid var(--border);

      border-bottom-left-radius:5px;

    }


    .zeng-message-content {

      display:flex;

      align-items:flex-end;

      gap:6px;

    }


    .zeng-message-text {

      font-size:13px;

      line-height:1.4;

      white-space:pre-wrap;

      word-break:break-word;

      min-width:0;

    }


    .zeng-message-meta {

      display:inline-flex;

      align-items:center;

      gap:3px;

      flex-shrink:0;

      white-space:nowrap;

      font-size:8px;

      opacity:.72;

      line-height:1;

      padding-bottom:1px;

    }


    .zeng-seen {

      font-weight:850;

      letter-spacing:-1px;

      font-size:11px;

    }


    .zeng-message-edited {

      font-size:8px;

      opacity:.75;

    }


    .zeng-message-action {

      border:none;

      background:transparent;

      color:inherit;

      cursor:pointer;

      font-size:14px;

      line-height:1;

      padding:1px;

      opacity:.65;

      flex-shrink:0;

    }


    /* =====================================================
       NEW MESSAGE ALERT
       ===================================================== */

    .zeng-new-message-alert {

      display:none;

      align-items:center;

      gap:8px;

      padding:8px 10px;

      margin-bottom:4px;

      border-radius:11px;

      background:#fff0f0;

      border:1px solid #ef9a9a;

      color:#c62828;

      font-size:11px;

      font-weight:750;

      cursor:pointer;

    }


    .zeng-new-message-alert.visible {

      display:flex;

    }


    .zeng-new-message-alert-dot {

      width:8px;

      height:8px;

      min-width:8px;

      border-radius:50%;

      background:#e53935;

    }


    .zeng-new-message-alert-text {

      flex:1;

      min-width:0;

      overflow:hidden;

      white-space:nowrap;

      text-overflow:ellipsis;

    }


    /* =====================================================
       COMPOSER
       ===================================================== */

    .zeng-message-composer-area {

      flex-shrink:0;

    }


    .zeng-message-composer {

      padding:7px 0 2px;

      display:flex;

      gap:7px;

      align-items:flex-end;

    }


    .zeng-message-input {

      flex:1;

      min-height:43px;

      max-height:120px;

      resize:none;

      border:1px solid var(--border);

      border-radius:15px;

      padding:11px 12px;

      background:#fff0f5;

      color:var(--text);

      font:inherit;

      font-size:13px;

      outline:none;

      line-height:1.35;

      box-sizing:border-box;

    }


    .zeng-message-input:focus {

      border-color:var(--primary);

    }


    .zeng-send-button {

      width:45px;

      height:43px;

      border:none;

      border-radius:14px;

      background:#79cfc5;

      color:white;

      cursor:pointer;

      font-size:18px;

      flex-shrink:0;

    }


    .zeng-send-button:disabled {

      opacity:.5;

      cursor:not-allowed;

    }


    /* =====================================================
       EDIT BAR
       ===================================================== */

    .zeng-edit-bar {

      display:none;

      padding:7px 10px;

      margin-bottom:2px;

      border-radius:10px;

      background:#fff0f5;

      font-size:10px;

      color:var(--text-secondary);

    }


    .zeng-edit-bar.active {

      display:flex;

      align-items:center;

      justify-content:space-between;

      gap:8px;

    }


    .zeng-edit-cancel {

      border:none;

      background:transparent;

      color:var(--primary);

      cursor:pointer;

      font-weight:700;

      font-size:10px;

    }


    /* =====================================================
       BLOCKED
       ===================================================== */

    .zeng-blocked-note {

      padding:12px;

      border-radius:12px;

      background:#fff0f5;

      color:var(--text-secondary);

      text-align:center;

      font-size:11px;

      line-height:1.5;

    }


    /* =====================================================
       MOBILE
       ===================================================== */

    @media (max-width:600px) {

      .zeng-conversation {

        height:calc(100dvh - 24px);

      }


      .zeng-message {

        max-width:89%;

      }


      .zeng-message-content {

        gap:5px;

      }


      .zeng-message-text {

        font-size:13px;

      }

    }

  `;


  document.head.appendChild(
    style
  );

}


// =========================================================
// FORMAT PREVIEW
// =========================================================

function formatPreview(
  text
) {

  if (!text) {

    return "Start a conversation";

  }


  const clean =
    String(text)
      .replace(/\s+/g, " ")
      .trim();


  if (
    clean.length > 50
  ) {

    return (
      clean.slice(0, 50) +
      "…"
    );

  }


  return clean;

}


// =========================================================
// FORMAT TIME
// =========================================================

function getTimestampDate(
  timestamp
) {

  if (
    !timestamp
  ) {

    return null;

  }


  if (
    typeof timestamp.toDate ===
    "function"
  ) {

    return timestamp.toDate();

  }


  if (
    timestamp instanceof Date
  ) {

    return timestamp;

  }


  return null;

}


function formatTime(
  timestamp
) {

  const date =
    getTimestampDate(
      timestamp
    );


  if (!date) {

    return "";

  }


  return date.toLocaleTimeString(
    [],
    {
      hour: "numeric",
      minute: "2-digit"
    }
  );

}


// =========================================================
// LOAD CURRENT PROFILE
// =========================================================

async function loadCurrentProfile() {

  const user =
    getCurrentUser();


  if (!user) {

    return null;

  }


  ChatState.currentUser =
    user;


  const profileSnap =
    await getDoc(
      doc(
        db,
        USERS_COLLECTION,
        user.uid
      )
    );


  if (
    profileSnap.exists()
  ) {

    ChatState.currentProfile =
      profileSnap.data();

  } else {

    ChatState.currentProfile =
      {};

  }


  ChatState.blockedUsers =
    new Set(
      ChatState.currentProfile
        ?.blockedUsers || []
    );


  return ChatState.currentProfile;

}


// =========================================================
// START USERS LISTENER
// =========================================================

function startUsersListener(
  onUpdate
) {

  if (
    ChatState.unsubscribeUsers
  ) {

    ChatState.unsubscribeUsers();

  }


  const usersQuery =
    query(
      collection(
        db,
        USERS_COLLECTION
      ),
      orderBy(
        "displayNameLower"
      )
    );


  ChatState.unsubscribeUsers =
    onSnapshot(
      usersQuery,
      (snapshot) => {

        ChatState.users =
          snapshot.docs

            .map(
              (item) => ({
                id:
                  item.id,
                ...item.data()
              })
            )

            .filter(
              (user) =>
                user.id !==
                ChatState.currentUser?.uid
            )

            .filter(
              (user) =>
                !ChatState.blockedUsers.has(
                  user.id
                )
            );


        onUpdate?.();

      },
      (error) => {

        console.error(
          "Chat users listener error:",
          error
        );

      }
    );

}


// =========================================================
// START CONVERSATION LISTENER
// =========================================================

function startConversationListener(
  onUpdate
) {

  if (
    ChatState.unsubscribeConversationList
  ) {

    ChatState.unsubscribeConversationList();

  }


  const currentUid =
    ChatState.currentUser?.uid;


  if (!currentUid) {

    return;

  }


  const chatsQuery =
    query(
      collection(
        db,
        CHATS_COLLECTION
      ),
      where(
        "participants",
        "array-contains",
        currentUid
      )
    );


  ChatState.unsubscribeConversationList =
    onSnapshot(
      chatsQuery,
      (snapshot) => {

        const conversations = {};


        snapshot.docs.forEach(
          (chatDoc) => {

            const data =
              chatDoc.data();


            const participants =
              Array.isArray(
                data.participants
              )
                ?
                data.participants
                :
                [];


            const otherUid =
              participants.find(
                (uid) =>
                  uid !==
                  currentUid
              );


            if (!otherUid) {

              return;

            }


            if (
              ChatState.blockedUsers.has(
                otherUid
              )
            ) {

              return;

            }


            conversations[otherUid] = {

              chatId:
                chatDoc.id,

              lastMessage:
                data.lastMessage || "",

              lastMessageAt:
                data.lastMessageAt || null,

              lastSenderId:
                data.lastSenderId || "",

              unreadFor:
                Array.isArray(
                  data.unreadFor
                )
                  ?
                  data.unreadFor
                  :
                  []

            };

          }
        );


        ChatState.conversations =
          conversations;

// ---------------------------------------------
        // Show unread indicator on conversation header.
        // ---------------------------------------------

        const unreadDot =
          document.getElementById(
            "zengConversationUnreadDot"
          );


        if (
          unreadDot &&
          ChatState.view ===
            "conversation" &&
          ChatState.selectedUser
        ) {

          const selectedUid =
            ChatState.selectedUser.id;


          const conversation =
            conversations[
              selectedUid
            ];


          const hasUnreadMessage =
            conversation &&
            conversation.lastSenderId !==
              currentUid &&
            conversation.unreadFor?.includes(
              currentUid
            );


          unreadDot.style.display =
            hasUnreadMessage
            ?
            "block"
            :
            "none";

        }
      
        onUpdate?.();

      },
      (error) => {

        console.error(
          "Chat conversation listener error:",
          error
        );

      }
    );

}


// =========================================================
// GET SORTED INBOX USERS
// =========================================================

function getSortedInboxUsers() {

  const users =
    [...ChatState.users];


  users.sort(
    (a, b) => {

      const conversationA =
        ChatState.conversations[
          a.id
        ];


      const conversationB =
        ChatState.conversations[
          b.id
        ];


      const timeA =
        conversationA
          ?.lastMessageAt
          ?.toMillis?.() || 0;


      const timeB =
        conversationB
          ?.lastMessageAt
          ?.toMillis?.() || 0;


      if (
        timeA !==
        timeB
      ) {

        return timeB - timeA;

      }


      return String(
        a.displayNameLower ||
        a.displayName ||
        ""
      ).localeCompare(
        String(
          b.displayNameLower ||
          b.displayName ||
          ""
        )
      );

    }
  );


  return users;

}


// =========================================================
// RENDER INBOX
// =========================================================

function renderInbox(
  container
) {

  const list =
    container.querySelector(
      "#zengUserList"
    );


  if (!list) {

    return;

  }


  const users =
    getSortedInboxUsers();


  if (
    users.length === 0
  ) {

    list.innerHTML = `

      <div class="card zeng-chat-empty">

        No other learners are available yet.

        <br>

        Create another account to start
        practicing English together.

      </div>

    `;

    return;

  }


  list.innerHTML =
    users.map(
      (user) => {

        const conversation =
          ChatState.conversations[
            user.id
          ] || {};


        const unread =
          Array.isArray(
            conversation.unreadFor
          ) &&
          conversation.unreadFor.includes(
            ChatState.currentUser?.uid
          );


        const online =
          Boolean(
            user.isOnline
          );


        const conversationTime =
          formatTime(
            conversation.lastMessageAt
          );


        const preview =
          conversation.lastMessage
            ?
            (
              conversation.lastSenderId ===
              ChatState.currentUser?.uid
                ?
                `You: ${formatPreview(
                  conversation.lastMessage
                )}`
                :
                formatPreview(
                  conversation.lastMessage
                )
            )
            :
            "Start a conversation";


        return `

          <button
            type="button"
            class="card zeng-user-card"
            data-chat-user="${escapeHTML(user.id)}"
          >

            <div class="zeng-user-avatar">

              ${
                user.photoURL
                ?
                `<img
                  src="${escapeHTML(user.photoURL)}"
                  alt=""
                  style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                  "
                >`
                :
                "👤"
              }

            </div>


            <div class="zeng-user-info">

              <div class="zeng-user-name-row">

                <div class="zeng-user-name">
                  ${escapeHTML(
                    user.displayName ||
                    "Learner"
                  )}
                </div>


                ${
                  unread
                  ?
                  `<span
                    class="zeng-new-message-badge"
                    aria-label="New message"
                    title="New message"
                  ></span>`
                  :
                  ""
                }

              </div>


              <div class="zeng-user-status">

                ${
                  online
                  ?
                  `<span class="zeng-online-dot"></span>Online`
                  :
                  "English learner"
                }

              </div>


              <div class="zeng-user-preview">

                ${escapeHTML(
                  preview
                )}

              </div>

            </div>


            <div class="zeng-user-right">

              ${
                conversationTime
                ?
                `<div class="zeng-user-time">
                  ${escapeHTML(
                    conversationTime
                  )}
                </div>`
                :
                ""
              }


              ${
                unread
                ?
                `<span
                  class="zeng-unread-dot"
                  aria-label="Unread message"
                ></span>`
                :
                ""
              }

            </div>

          </button>

        `;

      }
    ).join("");


  list
    .querySelectorAll(
      "[data-chat-user]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            const uid =
              button.dataset.chatUser;


            const user =
              ChatState.users.find(
                (item) =>
                  item.id === uid
              );


            if (user) {

              openConversation(
                container,
                user
              );

            }

          }
        );

      }
    );

}


// =========================================================
// MARK CONVERSATION READ
// =========================================================

async function markConversationRead(
  chatId
) {

  const currentUid =
    ChatState.currentUser?.uid;


  if (
    !chatId ||
    !currentUid
  ) {

    return;

  }


  try {

    await updateDoc(
      doc(
        db,
        CHATS_COLLECTION,
        chatId
      ),
      {

        unreadFor:
          arrayRemove(
            currentUid
          )

      }
    );

  } catch (error) {

    console.warn(
      "Unable to mark chat as read:",
      error
    );

  }

}


// =========================================================
// NEW MESSAGE ALERT
// =========================================================

function showNewMessageAlert(
  text
) {

  const alertBox =
    document.getElementById(
      "zengNewMessageAlert"
    );


  const alertText =
    document.getElementById(
      "zengNewMessageAlertText"
    );


  if (
    !alertBox
  ) {

    return;

  }


  if (alertText) {

    alertText.textContent =
      `New message: ${formatPreview(
        text
      )}`;

  }


  alertBox.classList.add(
    "visible"
  );


  ChatState.newMessageAlertVisible =
    true;

}


// =========================================================
// HIDE NEW MESSAGE ALERT
// =========================================================

function hideNewMessageAlert() {

  const alertBox =
    document.getElementById(
      "zengNewMessageAlert"
    );


  alertBox?.classList.remove(
    "visible"
  );


  ChatState.newMessageAlertVisible =
    false;

}


// =========================================================
// RENDER CHAT HOME / INBOX
// =========================================================

function renderChatHome(
  container
) {

  ChatState.view =
    "inbox";

  ChatState.selectedUser =
    null;

  ChatState.selectedChatId =
    null;

  ChatState.editingMessageId =
    null;

  ChatState.lastRenderedMessageCount =
    0;

  ChatState.newMessageAlertVisible =
    false;


  cleanupMessageListener();


  container.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          padding:20px 16px 32px;
        "
      >

        <div class="zeng-chat-page">


          <button
            type="button"
            class="zeng-chat-back"
            id="zengChatBack"
          >
            ← Back to Dashboard
          </button>


          <div
            class="card zeng-chat-header"
          >

            <div class="zeng-inbox-title-row">

              <div>

                <div class="zeng-inbox-title">
                  💬 Messages
                </div>

                <div class="zeng-inbox-subtitle">
                  Practice English with other learners.
                </div>

              </div>

            </div>

          </div>


          <div
            style="
              margin-top:18px;
              font-size:17px;
              font-weight:800;
            "
          >
            Conversations
          </div>


          <div
            id="zengUserList"
            class="zeng-user-list"
          >

            <div class="zeng-chat-loading">
              Loading learners...
            </div>

          </div>


        </div>

      </div>

    </div>

  `;


  
  document
    .getElementById(
      "zengChatBack"
    )
    ?.addEventListener(
      "click",
      () => {

        cleanupChatListeners();

        window.dispatchEvent(
          new CustomEvent(
            "zeng:navigate",
            {
              detail: {
                page:
                  "dashboard"
              }
            }
          )
        );

      }
    );


  startUsersListener(
    () => {

      if (
        ChatState.view ===
        "inbox"
      ) {

        renderInbox(
          container
        );

      }

    }
  );


  startConversationListener(
    () => {

      if (
        ChatState.view ===
        "inbox"
      ) {

        renderInbox(
          container
        );

      }

    }
  );

}

// =========================================================
// OPEN CONVERSATION
// =========================================================

async function openConversation(
  container,
  selectedUser
) {

  const currentUid =
    ChatState.currentUser?.uid;


  if (
    !currentUid ||
    !selectedUser?.id
  ) {

    return;

  }


  cleanupMessageListener();


  ChatState.view =
    "conversation";

  ChatState.selectedUser =
    selectedUser;

  ChatState.selectedChatId =
    getChatId(
      currentUid,
      selectedUser.id
    );

  ChatState.editingMessageId =
    null;

  ChatState.lastRenderedMessageCount =
    0;

  ChatState.newMessageAlertVisible =
    false;


  const chatId =
    ChatState.selectedChatId;


  container.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          padding:12px 10px 18px;
        "
      >

        <div class="zeng-chat-page">

          <div class="zeng-conversation">


            <!-- =========================================
                 HEADER
                 ========================================= -->

            <div
              class="zeng-conversation-header"
            >

              <button
                type="button"
                class="zeng-conversation-back"
                id="zengConversationBack"
                aria-label="Back to messages"
              >
                ←
              </button>


              <div class="zeng-user-avatar">

                ${
                  selectedUser.photoURL
                  ?
                  `<img
                    src="${escapeHTML(
                      selectedUser.photoURL
                    )}"
                    alt=""
                    style="
                      width:100%;
                      height:100%;
                      object-fit:cover;
                    "
                  >`
                  :
                  "👤"
                }

              </div>


              <div class="zeng-conversation-user">

                <div class="zeng-conversation-name">
                  ${escapeHTML(
                    selectedUser.displayName ||
                    "Learner"
                  )}
                </div>


                <div class="zeng-conversation-status">

                  ${
                    selectedUser.isOnline
                    ?
                    "Online"
                    :
                    "English learner"
                  }

                </div>

              </div>


              <!-- MESSAGE / INBOX BUTTON -->

              <button
                type="button"
                class="zeng-conversation-messages"
                id="zengConversationMessages"
                aria-label="Messages"
                style="position:relative;"
              >
                💬

                <span
                  id="zengConversationUnreadDot"
                  style="
                    display:none;
                    position:absolute;
                    top:2px;
                    right:2px;
                    width:9px;
                    height:9px;
                    border-radius:50%;
                    background:#d62839;
                    border:2px solid white;
                  "
                ></span>

              </button>


              <button
                type="button"
                class="zeng-conversation-menu"
                id="zengConversationMenu"
                aria-label="Chat menu"
              >
                ⋮
              </button>


              <div
                class="zeng-chat-menu-panel"
                id="zengChatMenuPanel"
              >

                <button
                  type="button"
                  class="zeng-chat-menu-item"
                  id="zengClearChatButton"
                >
                  🗑️ Clear chat
                </button>


                <button
                  type="button"
                  class="zeng-chat-menu-item danger"
                  id="zengBlockUserButton"
                >
                  🚫 Block user
                </button>

              </div>

            </div>


            <!-- =========================================
                 MESSAGES
                 ========================================= -->

            <div
              id="zengMessages"
              class="zeng-messages"
            >

              <div class="zeng-chat-loading">
                Loading messages...
              </div>

            </div>


            <!-- =========================================
                 COMPOSER
                 ========================================= -->

            <div class="zeng-message-composer-area">


              <!-- =======================================
                   NEW MESSAGE ALERT
                   ======================================= -->

              <div
                id="zengNewMessageAlert"
                class="zeng-new-message-alert"
                role="status"
              >

                <span
                  class="zeng-new-message-alert-dot"
                ></span>


                <span
                  id="zengNewMessageAlertText"
                  class="zeng-new-message-alert-text"
                >
                  New message
                </span>

              </div>


              <!-- =======================================
                   EDIT BAR
                   ======================================= -->

                  

        <div
                id="zengEditBar"
                class="zeng-edit-bar"
              >

                <span>
                  ✏️ Editing message
                </span>


                <button
                  type="button"
                  class="zeng-edit-cancel"
                  id="zengCancelEdit"
                >
                  Cancel
                </button>

              </div>


              <div
                id="zengComposer"
                class="zeng-message-composer"
              >

                <textarea
                  id="zengMessageInput"
                  class="zeng-message-input"
                  maxlength="${MAX_MESSAGE_LENGTH}"
                  rows="1"
                  placeholder="Write a message..."
                ></textarea>


                <button
                  type="button"
                  id="zengSendButton"
                  class="zeng-send-button"
                  aria-label="Send message"
                >
                  ➤
                </button>

              </div>

            </div>


          </div>

        </div>

      </div>

    </div>

  `;


  // =====================================================
  // NEW ALERT CLICK
  // =====================================================

  document
    .getElementById(
      "zengNewMessageAlert"
    )
    ?.addEventListener(
      "click",
      () => {

        const messagesBox =
          document.getElementById(
            "zengMessages"
          );


        if (messagesBox) {

          messagesBox.scrollTo({
            top:
              messagesBox.scrollHeight,

            behavior:
              "smooth"

          });

        }


        hideNewMessageAlert();


        markConversationRead(
          chatId
        );

      }
    );


  // =====================================================
  // BACK TO INBOX
  // =====================================================

  document
    .getElementById(
      "zengConversationBack"
    )
    ?.addEventListener(
      "click",
      () => {

        cleanupMessageListener();

        renderChatHome(
          container
        );

      }
    );


  // =====================================================
  // CHAT MENU
  // =====================================================

  const menuButton =
    document.getElementById(
      "zengConversationMenu"
    );


  const menuPanel =
    document.getElementById(
      "zengChatMenuPanel"
    );


  menuButton?.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      menuPanel?.classList.toggle(
        "open"
      );

    }
  );


  // =====================================================
  // CLEAR CHAT
  // =====================================================

  document
    .getElementById(
      "zengClearChatButton"
    )
    ?.addEventListener(
      "click",
      async () => {

        menuPanel?.classList.remove(
          "open"
        );


        const confirmed =
          window.confirm(
            "Clear all messages from this chat? This will permanently delete the messages from Firebase."
          );


        if (!confirmed) {

          return;

        }


        const button =
          document.getElementById(
            "zengClearChatButton"
          );


        if (button) {

          button.disabled =
            true;

          button.textContent =
            "Clearing...";

        }


        try {

          await clearChat(
            chatId
          );


          delete ChatState.conversations[
            selectedUser.id
          ];


          cleanupMessageListener();


          renderChatHome(
            container
          );


        } catch (error) {

          console.error(
            "Clear chat error:",
            error
          );


          alert(
            error?.message ||
            "Unable to clear chat."
          );


          if (button) {

            button.disabled =
              false;

            button.textContent =
              "🗑️ Clear chat";

          }

        }

      }
    );


  // =====================================================
  // BLOCK USER
  // =====================================================

  document
    .getElementById(
      "zengBlockUserButton"
    )
    ?.addEventListener(
      "click",
      async () => {

        menuPanel?.classList.remove(
          "open"
        );


        const confirmed =
          window.confirm(
            `Block ${selectedUser.displayName || "this user"}?`
          );


        if (!confirmed) {

          return;

        }


        try {

          await blockUser(
            selectedUser.id
          );


          cleanupMessageListener();


          renderChatHome(
            container
          );


        } catch (error) {

          console.error(
            "Block user error:",
            error
          );

        }

      }
    );


  // =====================================================
  // CLOSE MENU OUTSIDE
  // =====================================================

  const outsideMenuHandler =
    (event) => {

      if (
        menuPanel &&
        !menuPanel.contains(
          event.target
        ) &&
        !menuButton?.contains(
          event.target
        )
      ) {

        menuPanel.classList.remove(
          "open"
        );

      }

    };


  document.addEventListener(
    "click",
    outsideMenuHandler
  );


  // =====================================================
  // MESSAGE INPUT
  // =====================================================

  const input =
    document.getElementById(
      "zengMessageInput"
    );


  const sendButton =
    document.getElementById(
      "zengSendButton"
    );


  input?.addEventListener(
    "input",
    () => {

      input.style.height =
        "auto";


      input.style.height =
        Math.min(
          input.scrollHeight,
          120
        ) + "px";

    }
  );


  input?.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendMessage(
          container
        );

      }

    }
  );


  sendButton?.addEventListener(
    "click",
    () => {

      sendMessage(
        container
      );

    }
  );


  document
    .getElementById(
      "zengCancelEdit"
    )
    ?.addEventListener(
      "click",
      () => {

        cancelMessageEdit();

      }
    );


  // =====================================================
  // MESSAGE LISTENER
  // =====================================================

  startMessagesListener(
    container,
    chatId
  );


  // =====================================================
  // MARK EXISTING CHAT READ
  // =====================================================

  try {

    const chatSnap =
      await getDoc(
        doc(
          db,
          CHATS_COLLECTION,
          chatId
        )
      );


    if (
      chatSnap.exists()
    ) {

      await markConversationRead(
        chatId
      );

    }

  } catch (error) {

    console.warn(
      "Unable to mark chat read:",
      error
    );

  }

}


// =========================================================
// START MESSAGE LISTENER
// =========================================================

function startMessagesListener(
  container,
  chatId
) {

  cleanupMessageListener();


  const messagesRef =
    collection(
      db,
      CHATS_COLLECTION,
      chatId,
      MESSAGES_SUBCOLLECTION
    );


  const messagesQuery =
    query(
      messagesRef,
      orderBy(
        "createdAt",
        "asc"
      )
    );


  ChatState.unsubscribeMessages =
    onSnapshot(
      messagesQuery,
      async (snapshot) => {

        const messages =
          snapshot.docs.map(
            (item) => ({

              id:
                item.id,

              ...item.data()

            })
          );


        renderMessages(
          container,
          messages
        );


        const currentUid =
          ChatState.currentUser?.uid;


        // ---------------------------------------------
        // Find incoming unseen messages
        // ---------------------------------------------

        const unseenIncoming =
          snapshot.docs.filter(
            (messageDoc) => {

              const data =
                messageDoc.data();


              return (

                data.receiverId ===
                currentUid

                &&

                data.seen !== true

              );

            }
          );


        // ---------------------------------------------
        // Mark incoming messages seen.
        //
        // This does NOT remove the visual new-message
        // alert immediately if the conversation listener
        // already detected it.
        // ---------------------------------------------

        for (
          const messageDoc
          of unseenIncoming
        ) {

          try {

            await updateDoc(
              messageDoc.ref,
              {

                seen:
                  true,

                seenAt:
                  serverTimestamp()

              }
            );

          } catch (error) {

            console.warn(
              "Unable to mark message seen:",
              error
            );

          }

        }


        // ---------------------------------------------
        // Existing chat is considered read after opening.
        // ---------------------------------------------

        await markConversationRead(
          chatId
        );

      },
      (error) => {

        console.error(
          "Messages listener error:",
          error
        );


        const messages =
          container.querySelector(
            "#zengMessages"
          );


        if (messages) {

          messages.innerHTML = `

            <div class="zeng-chat-empty">

              Unable to load messages.

              <br>

              Please check your connection
              and Firestore permissions.

            </div>

          `;

        }

      }
    );

}


// =========================================================
// RENDER MESSAGES
// =========================================================

function renderMessages(
  container,
  messages
) {

  const messagesBox =
    container.querySelector(
      "#zengMessages"
    );


  if (!messagesBox) {

    return;

  }


  if (
    messages.length === 0
  ) {

    messagesBox.innerHTML = `

      <div
        class="zeng-chat-empty"
        style="margin:auto;"
      >

        👋 Start the conversation.

        <br>

        Practice your English naturally.

      </div>

    `;


    ChatState.lastRenderedMessageCount =
      0;


    return;

  }


  const currentUid =
    ChatState.currentUser?.uid;


  messagesBox.innerHTML =
    messages.map(
      (message) => {

        const mine =
          message.senderId ===
          currentUid;


        return `

          <div
            class="zeng-message-row ${
              mine
              ?
              "mine"
              :
              "theirs"
            }"
          >

            <div
              class="zeng-message ${
                mine
                ?
                "mine"
                :
                "theirs"
              }"
            >

              <div class="zeng-message-content">

                <div class="zeng-message-text">
                  ${escapeHTML(
                    message.text
                  )}
                </div>


                <div class="zeng-message-meta">

                  ${
                    message.edited
                    ?
                    `<span class="zeng-message-edited">
                      edited
                    </span>`
                    :
                    ""
                  }


                  <span>
                    ${escapeHTML(
                      formatTime(
                        message.createdAt
                      )
                    )}
                  </span>


                  ${
                    mine
                    ?
                    `
                      <span
                        class="zeng-seen"
                        title="${
                          message.seen
                          ?
                          "Seen"
                          :
                          "Sent"
                        }"
                      >
                        ${
                          message.seen
                          ?
                          "✓✓"
                          :
                          "✓"
                        }
                      </span>
                    `
                    :
                    ""
                  }


                  ${
                    mine
                    ?
                    `
                      <button
                        type="button"
                        class="zeng-message-action"
                        data-message-menu="${escapeHTML(
                          message.id
                        )}"
                        aria-label="Message menu"
                      >
                        ⋮
                      </button>
                    `
                    :
                    ""
                  }

                </div>

              </div>

            </div>

          </div>

        `;

      }
    ).join("");


  // =====================================================
  // MESSAGE MENU
  // =====================================================

  messagesBox
    .querySelectorAll(
      "[data-message-menu]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          (event) => {

            event.stopPropagation();


            const messageId =
              button.dataset.messageMenu;


            showMessageMenu(
              container,
              messageId
            );

          }
        );

      }
    );


  // =====================================================
  // SCROLL
  // =====================================================

  messagesBox.scrollTop =
    messagesBox.scrollHeight;


  ChatState.lastRenderedMessageCount =
    messages.length;

}


// =========================================================
// MESSAGE MENU
// =========================================================

function showMessageMenu(
  container,
  messageId
) {

  document
    .getElementById(
      "zengMessageActionPopup"
    )
    ?.remove();


  const popup =
    document.createElement(
      "div"
    );


  popup.id =
    "zengMessageActionPopup";


  popup.style.cssText = `

    position:fixed;

    right:18px;

    bottom:82px;

    z-index:100;

    background:#fff0f5;

    border-radius:12px;

    box-shadow:0 8px 28px rgba(0,0,0,.18);

    padding:5px;

    min-width:150px;

  `;


  popup.innerHTML = `

    <button
      type="button"
      data-action="edit"
      style="
        width:100%;
        border:none;
        background:transparent;
        text-align:left;
        padding:11px;
        cursor:pointer;
        border-radius:8px;
        font-size:12px;
      "
    >
      ✏️ Edit message
    </button>

  `;


  document.body.appendChild(
    popup
  );


  popup
    .querySelector(
      "[data-action='edit']"
    )
    ?.addEventListener(
      "click",
      async () => {

        popup.remove();


        await beginMessageEdit(
          container,
          messageId
        );

      }
    );


  const closePopup =
    (event) => {

      if (
        !popup.contains(
          event.target
        )
      ) {

        popup.remove();

        document.removeEventListener(
          "click",
          closePopup
        );

      }

    };


  setTimeout(
    () => {

      document.addEventListener(
        "click",
        closePopup
      );

    },
    0
  );

}


// =========================================================
// BEGIN MESSAGE EDIT
// =========================================================

async function beginMessageEdit(
  container,
  messageId
) {

  const chatId =
    ChatState.selectedChatId;


  if (
    !chatId ||
    !messageId
  ) {

    return;

  }


  try {

    const messageSnap =
      await getDoc(
        doc(
          db,
          CHATS_COLLECTION,
          chatId,
          MESSAGES_SUBCOLLECTION,
          messageId
        )
      );


    if (
      !messageSnap.exists()
    ) {

      return;

    }


    const message =
      messageSnap.data();


    if (
      message.senderId !==
      ChatState.currentUser?.uid
    ) {

      return;

    }


    ChatState.editingMessageId =
      messageId;


    const input =
      document.getElementById(
        "zengMessageInput"
      );


    const editBar =
      document.getElementById(
        "zengEditBar"
      );


    if (input) {

      input.value =
        message.text || "";

      input.focus();

      input.style.height =
        "auto";

      input.style.height =
        Math.min(
          input.scrollHeight,
          120
        ) + "px";

    }


    editBar?.classList.add(
      "active"
    );

  } catch (error) {

    console.error(
      "Unable to edit message:",
      error
    );

  }

}


// =========================================================
// CANCEL EDIT
// =========================================================

function cancelMessageEdit() {

  ChatState.editingMessageId =
    null;


  const input =
    document.getElementById(
      "zengMessageInput"
    );


  const editBar =
    document.getElementById(
      "zengEditBar"
    );


  if (input) {

    input.value =
      "";

    input.style.height =
      "auto";

  }


  editBar?.classList.remove(
    "active"
  );

}


// =========================================================
// ENSURE CHAT DOCUMENT
// =========================================================
//
// Creates a chat document when it does not exist.
//
// IMPORTANT:
// A new conversation does not need to be read first.
// If the chat does not exist, it is created directly.
// Existing chats are verified before use.
// =========================================================

async function ensureChatDocument(
  chatId,
  currentUid,
  selectedUid
) {

  const chatRef =
    doc(
      db,
      CHATS_COLLECTION,
      chatId
    );


  const participants =
    getParticipantIds(
      currentUid,
      selectedUid
    );


  const chatSnap =
    await getDoc(
      chatRef
    );


  // -------------------------------------------------------
  // Existing chat
  // -------------------------------------------------------

  if (
    chatSnap.exists()
  ) {

    const existing =
      chatSnap.data();


    if (
      !Array.isArray(
        existing.participants
      )
      ||
      existing.participants.length !==
        2
    ) {

      throw new Error(
        "This chat has invalid participant data."
      );

    }


    if (
      !existing.participants.includes(
        currentUid
      )
      ||
      !existing.participants.includes(
        selectedUid
      )
    ) {

      throw new Error(
        "You do not belong to this chat."
      );

    }


    return {
      chatRef,
      exists: true
    };

  }


  // -------------------------------------------------------
  // New chat
  // -------------------------------------------------------
  //
  // Do NOT try to read a non-existing chat again.
  // sendMessage() will create it together with the
  // first message.
  // -------------------------------------------------------

  return {
    chatRef,
    exists: false
  };

}

// =========================================================
// SEND MESSAGE
// =========================================================
//
// Handles both:
//
// 1. Existing chat
// 2. New chat
//
// For a new conversation, the chat document and first
// message are created in ONE batch.
// =========================================================

async function sendMessage(
  container
) {

  const input =
    document.getElementById(
      "zengMessageInput"
    );


  const sendButton =
    document.getElementById(
      "zengSendButton"
    );


  const text =
    String(
      input?.value || ""
    )
      .trim();


  if (!text) {

    return;

  }


  if (
    text.length >
    MAX_MESSAGE_LENGTH
  ) {

    alert(
      `Message cannot be longer than ${MAX_MESSAGE_LENGTH} characters.`
    );

    return;

  }


  const currentUid =
    ChatState.currentUser?.uid;


  const selectedUid =
    ChatState.selectedUser?.id;


  const chatId =
    ChatState.selectedChatId;


  if (
    !currentUid ||
    !selectedUid ||
    !chatId
  ) {

    return;

  }


  // =====================================================
  // EDIT EXISTING MESSAGE
  // =====================================================

  if (
    ChatState.editingMessageId
  ) {

    await saveEditedMessage(
      input,
      sendButton
    );

    return;

  }


  try {

    sendButton.disabled =
      true;


    // ---------------------------------------------------
    // Get chat reference.
    //
    // ensureChatDocument() no longer tries to create a
    // brand-new chat by itself.
    // ---------------------------------------------------

    const chatInfo =
      await ensureChatDocument(
        chatId,
        currentUid,
        selectedUid
      );


    const chatRef =
      chatInfo.chatRef;


    const messageRef =
      doc(
        collection(
          db,
          CHATS_COLLECTION,
          chatId,
          MESSAGES_SUBCOLLECTION
        )
      );


    const now =
      serverTimestamp();


    const batch =
      writeBatch(
        db
      );


    // ===================================================
    // NEW CHAT
    // ===================================================

    if (
      !chatInfo.exists
    ) {

      batch.set(
        chatRef,
        {

          participants:
            getParticipantIds(
              currentUid,
              selectedUid
            ),

          lastMessage:
            text,

          lastMessageAt:
            now,

          lastSenderId:
            currentUid,

          unreadFor:
            [selectedUid],

          updatedAt:
            now

        }
      );

    }


    // ===================================================
    // MESSAGE
    // ===================================================

    batch.set(
      messageRef,
      {

        senderId:
          currentUid,

        receiverId:
          selectedUid,

        text,

        createdAt:
          now,

        updatedAt:
          now,

        edited:
          false,

        seen:
          false

      }
    );


    // ===================================================
    // EXISTING CHAT
    // ===================================================

    if (
      chatInfo.exists
    ) {

      batch.update(
        chatRef,
        {

          lastMessage:
            text,

          lastMessageAt:
            now,

          lastSenderId:
            currentUid,

          unreadFor:
            [selectedUid],

          updatedAt:
            now

        }
      );

    }


    // ===================================================
    // ONE ATOMIC COMMIT
    // =====================================================

    await batch.commit();


    // ---------------------------------------------------
    // Clear composer.
    // ---------------------------------------------------

    input.value =
      "";

    input.style.height =
      "auto";


    hideNewMessageAlert();

  } catch (error) {

    console.error(
      "Send message error:",
      error
    );


    alert(
      error?.message ||
      "Unable to send message."
    );

  } finally {

    sendButton.disabled =
      false;

  }

}


// =========================================================
// SAVE EDITED MESSAGE
// =========================================================

async function saveEditedMessage(
  input,
  sendButton
) {

  const messageId =
    ChatState.editingMessageId;


  const chatId =
    ChatState.selectedChatId;


  const text =
    String(
      input?.value || ""
    )
      .trim();


  if (
    !messageId ||
    !chatId ||
    !text
  ) {

    return;

  }


  if (
    text.length >
    MAX_MESSAGE_LENGTH
  ) {

    alert(
      `Message cannot be longer than ${MAX_MESSAGE_LENGTH} characters.`
    );

    return;

  }


  try {

    sendButton.disabled =
      true;


    const messageRef =
      doc(
        db,
        CHATS_COLLECTION,
        chatId,
        MESSAGES_SUBCOLLECTION,
        messageId
      );


    const messageSnap =
      await getDoc(
        messageRef
      );


    if (
      !messageSnap.exists()
    ) {

      throw new Error(
        "Message no longer exists."
      );

    }


    const message =
      messageSnap.data();


    if (
      message.senderId !==
      ChatState.currentUser?.uid
    ) {

      throw new Error(
        "You can edit only your own messages."
      );

    }


    await updateDoc(
      messageRef,
      {

        text,

        edited:
          true,

        updatedAt:
          serverTimestamp()

      }
    );


    // ---------------------------------------------------
    // Update inbox preview only if this is latest message.
    // ---------------------------------------------------

    const messagesSnapshot =
      await getDocs(
        query(
          collection(
            db,
            CHATS_COLLECTION,
            chatId,
            MESSAGES_SUBCOLLECTION
          ),
          orderBy(
            "createdAt",
            "desc"
          )
        )
      );


    const latest =
      messagesSnapshot.docs[0];


    if (
      latest &&
      latest.id ===
        messageId
    ) {

      await updateDoc(
        doc(
          db,
          CHATS_COLLECTION,
          chatId
        ),
        {

          lastMessage:
            text,

          updatedAt:
            serverTimestamp()

        }
      );

    }


    cancelMessageEdit();

  } catch (error) {

    console.error(
      "Edit message error:",
      error
    );


    alert(
      error?.message ||
      "Unable to edit message."
    );

  } finally {

    sendButton.disabled =
      false;

  }

}


// =========================================================
// CLEAR CHAT
// =========================================================
//
// Deletes:
// 1. All messages
// 2. Chat metadata document
//
// This reduces Firestore storage usage.
// =========================================================

async function clearChat(
  chatId
) {

  if (!chatId) {

    throw new Error(
      "Chat ID is missing."
    );

  }


  const currentUid =
    ChatState.currentUser?.uid;


  if (!currentUid) {

    throw new Error(
      "You must be logged in."
    );

  }


  const chatRef =
    doc(
      db,
      CHATS_COLLECTION,
      chatId
    );


  const chatSnap =
    await getDoc(
      chatRef
    );


  if (
    !chatSnap.exists()
  ) {

    return;

  }


  const chatData =
    chatSnap.data();


  if (
    !Array.isArray(
      chatData.participants
    )
    ||
    !chatData.participants.includes(
      currentUid
    )
  ) {

    throw new Error(
      "You do not have permission to clear this chat."
    );

  }


  const messagesRef =
    collection(
      db,
      CHATS_COLLECTION,
      chatId,
      MESSAGES_SUBCOLLECTION
    );


  const messagesSnapshot =
    await getDocs(
      messagesRef
    );


  const messageDocs =
    messagesSnapshot.docs;


  // -----------------------------------------------------
  // Delete messages in safe chunks.
  // -----------------------------------------------------

  for (
    let start = 0;
    start < messageDocs.length;
    start += FIRESTORE_BATCH_LIMIT
  ) {

    const batch =
      writeBatch(
        db
      );


    const chunk =
      messageDocs.slice(
        start,
        start +
          FIRESTORE_BATCH_LIMIT
      );


    chunk.forEach(
      (messageDoc) => {

        batch.delete(
          messageDoc.ref
        );

      }
    );


    await batch.commit();

  }


  // -----------------------------------------------------
  // Delete chat metadata.
  // -----------------------------------------------------

  await deleteDoc(
    chatRef
  );

}


// =========================================================
// BLOCK USER
// =========================================================

async function blockUser(
  uid
) {

  const currentUid =
    ChatState.currentUser?.uid;


  if (
    !currentUid ||
    !uid
  ) {

    return;

  }


  try {

    await updateDoc(
      doc(
        db,
        USERS_COLLECTION,
        currentUid
      ),
      {

        blockedUsers:
          arrayUnion(
            uid
          ),

        updatedAt:
          serverTimestamp()

      }
    );


    ChatState.blockedUsers.add(
      uid
    );


    delete ChatState.conversations[
      uid
    ];

  } catch (error) {

    console.error(
      "Block user error:",
      error
    );


    alert(
      error?.message ||
      "Unable to block this user."
    );

    throw error;

  }

}


// =========================================================
// PUBLIC RENDER
// =========================================================

async function renderChatPage(
  container,
  options = {}
) {

  if (!container) {

    return;

  }


  cleanupChatListeners();


  ensureChatStyles();


  const user =
    getCurrentUser();


  if (!user) {

    container.innerHTML = `

      <div class="page">

        <div
          class="page-container"
          style="
            min-height:100dvh;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:20px;
          "
        >

          <div
            class="card"
            style="
              width:min(100%,430px);
              text-align:center;
              padding:24px;
            "
          >

            Please log in to use English Chat.

          </div>

        </div>

      </div>

    `;

    return;

  }


  try {

    await loadCurrentProfile();

  } catch (error) {

    console.error(
      "Unable to load chat profile:",
      error
    );

  }


  renderChatHome(
    container
  );

}


// =========================================================
// EXPORT
// =========================================================

export {

  ChatState,

  renderChatPage

};
