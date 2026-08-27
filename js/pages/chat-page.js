// =========================================================
// ZenG English Learn
// Chat Page
// =========================================================
//
// Real-time user-to-user English chat.
//
// Features:
// - Registered user list
// - Real-time conversations
// - Send messages
// - Seen status
// - Unread red dot
// - Last message preview
// - Message editing
// - Message menu
// - User blocking
// - Automatic chat ordering
//
// Firestore structure:
//
// zeng_englearn_users/{uid}
//
// chats/{chatId}
//   participants: [uid1, uid2]
//   lastMessage
//   lastMessageAt
//   lastSenderId
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

const MAX_MESSAGE_LENGTH =
  2000;


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

  blockedUsers: new Set()

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
// CHAT ID
// =========================================================
//
// Same two users always receive the same chat ID.
// =========================================================

function getChatId(
  uid1,
  uid2
) {

  return [
    String(uid1),
    String(uid2)
  ]
    .sort()
    .join("_");

}


// =========================================================
// CURRENT USER
// =========================================================

function getCurrentUser() {

  return auth.currentUser || null;

}


// =========================================================
// CLEANUP
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
// ENSURE STYLES
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

    .zeng-chat-page {

      width:min(100%,760px);

      margin:0 auto;

    }


    .zeng-chat-back {

      border:none;

      background:transparent;

      color:var(--primary);

      font-size:13px;

      font-weight:750;

      cursor:pointer;

      padding:6px 0;

    }


    .zeng-chat-header {

      margin-top:10px;

      padding:20px;

    }


    .zeng-chat-header-title {

      font-size:23px;

      font-weight:850;

    }


    .zeng-chat-header-text {

      margin-top:6px;

      color:var(--text-secondary);

      font-size:12px;

      line-height:1.5;

    }


    .zeng-user-list {

      display:flex;

      flex-direction:column;

      gap:8px;

      margin-top:14px;

    }


    .zeng-user-card {

      width:100%;

      border:none;

      text-align:left;

      cursor:pointer;

      padding:14px;

      display:flex;

      align-items:center;

      gap:12px;

      position:relative;

    }


    .zeng-user-avatar {

      width:46px;

      height:46px;

      border-radius:50%;

      background:var(--surface-soft);

      display:flex;

      align-items:center;

      justify-content:center;

      font-size:22px;

      flex-shrink:0;

    }


    .zeng-user-info {

      min-width:0;

      flex:1;

    }


    .zeng-user-name {

      font-size:14px;

      font-weight:800;

      white-space:nowrap;

      overflow:hidden;

      text-overflow:ellipsis;

    }


    .zeng-user-status {

      margin-top:4px;

      color:var(--text-secondary);

      font-size:11px;

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

      gap:6px;

      flex-shrink:0;

    }


    .zeng-unread-dot {

      width:10px;

      height:10px;

      border-radius:50%;

      background:#e53935;

      display:block;

    }


    .zeng-online-dot {

      width:8px;

      height:8px;

      border-radius:50%;

      background:#26a269;

      display:inline-block;

      margin-right:4px;

    }


    .zeng-chat-empty {

      padding:30px 18px;

      text-align:center;

      color:var(--text-secondary);

      font-size:12px;

      line-height:1.6;

    }


    .zeng-conversation {

      display:flex;

      flex-direction:column;

      height:calc(100dvh - 70px);

      min-height:500px;

    }


    .zeng-conversation-header {

      padding:13px 12px;

      display:flex;

      align-items:center;

      gap:10px;

      border-radius:16px;

      background:var(--surface);

      box-shadow:var(--shadow, 0 2px 12px rgba(0,0,0,.06));

    }


    .zeng-conversation-back {

      border:none;

      background:transparent;

      cursor:pointer;

      font-size:20px;

      padding:5px;

    }


    .zeng-conversation-user {

      flex:1;

      min-width:0;

    }


    .zeng-conversation-name {

      font-weight:850;

      font-size:15px;

    }


    .zeng-conversation-status {

      margin-top:3px;

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


    .zeng-messages {

      flex:1;

      overflow-y:auto;

      padding:16px 4px;

      display:flex;

      flex-direction:column;

      gap:8px;

    }


    .zeng-message-row {

      display:flex;

      width:100%;

    }


    .zeng-message-row.mine {

      justify-content:flex-end;

    }


    .zeng-message-row.theirs {

      justify-content:flex-start;

    }


    .zeng-message {

      max-width:min(82%,520px);

      padding:10px 12px;

      border-radius:15px;

      position:relative;

    }


    .zeng-message.mine {

      background:var(--primary);

      color:white;

      border-bottom-right-radius:5px;

    }


    .zeng-message.theirs {

      background:var(--surface-soft);

      color:var(--text);

      border-bottom-left-radius:5px;

    }


    .zeng-message-text {

      font-size:13px;

      line-height:1.55;

      white-space:pre-wrap;

      word-break:break-word;

    }


    .zeng-message-meta {

      margin-top:5px;

      display:flex;

      justify-content:flex-end;

      align-items:center;

      gap:5px;

      font-size:9px;

      opacity:.75;

    }


    .zeng-seen {

      font-weight:800;

      letter-spacing:-2px;

    }


    .zeng-message-edited {

      font-size:9px;

      opacity:.75;

    }


    .zeng-message-action {

      border:none;

      background:transparent;

      cursor:pointer;

      font-size:15px;

      margin-left:4px;

      opacity:.65;

    }


    .zeng-message-composer {

      padding:10px 0 4px;

      display:flex;

      gap:8px;

      align-items:flex-end;

    }


    .zeng-message-input {

      flex:1;

      min-height:44px;

      max-height:120px;

      resize:none;

      border:1px solid var(--border);

      border-radius:15px;

      padding:12px;

      background:var(--surface);

      color:var(--text);

      font:inherit;

      font-size:13px;

      outline:none;

    }


    .zeng-message-input:focus {

      border-color:var(--primary);

    }


    .zeng-send-button {

      width:46px;

      height:44px;

      border:none;

      border-radius:14px;

      background:var(--primary);

      color:white;

      cursor:pointer;

      font-size:19px;

      flex-shrink:0;

    }


    .zeng-send-button:disabled {

      opacity:.5;

      cursor:not-allowed;

    }


    .zeng-edit-bar {

      display:none;

      padding:9px 12px;

      margin-bottom:5px;

      border-radius:11px;

      background:var(--surface-soft);

      font-size:11px;

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

    }


    .zeng-blocked-note {

      padding:12px;

      border-radius:12px;

      background:var(--surface-soft);

      color:var(--text-secondary);

      text-align:center;

      font-size:11px;

      line-height:1.5;

    }


    .zeng-chat-loading {

      padding:30px;

      text-align:center;

      color:var(--text-secondary);

      font-size:12px;

    }


    .zeng-chat-menu-panel {

      position:absolute;

      right:10px;

      top:58px;

      z-index:20;

      min-width:180px;

      padding:6px;

      border-radius:13px;

      background:var(--surface);

      box-shadow:0 8px 30px rgba(0,0,0,.15);

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

      background:var(--surface-soft);

    }


    .zeng-chat-menu-item.danger {

      color:#d32f2f;

    }


    @media (max-width:600px) {

      .zeng-conversation {

        height:calc(100dvh - 40px);

      }

      .zeng-message {

        max-width:88%;

      }

    }

  `;


  document.head.appendChild(
    style
  );

}


// =========================================================
// FORMAT LAST MESSAGE
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
    clean.length > 45
  ) {

    return (
      clean.slice(0, 45) +
      "…"
    );

  }


  return clean;

}


// =========================================================
// FORMAT TIME
// =========================================================

function formatTime(
  timestamp
) {

  if (
    !timestamp
  ) {

    return "";

  }


  let date = null;


  if (
    typeof timestamp.toDate ===
    "function"
  ) {

    date =
      timestamp.toDate();

  } else if (
    timestamp instanceof Date
  ) {

    date =
      timestamp;

  }


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
// LOAD USERS
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
                id: item.id,
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
// CONVERSATION DATA
// =========================================================
//
// Loads chats in which the current user participates.
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


            const otherUid =
              Array.isArray(
                data.participants
              )
                ?
                data.participants.find(
                  (uid) =>
                    uid !==
                    currentUid
                )
                :
                null;


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
                data.unreadFor || []

            };

          }
        );


        ChatState.conversations =
          conversations;


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
// SORT USERS
// =========================================================

function getSortedUsers() {

  const users =
    [...ChatState.users];


  users.sort(
    (a, b) => {

      const conversationA =
        ChatState.conversations[a.id];

      const conversationB =
        ChatState.conversations[b.id];


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
// RENDER USER LIST
// =========================================================

function renderUserList(
  container
) {

  const users =
    getSortedUsers();


  const list =
    container.querySelector(
      "#zengUserList"
    );


  if (!list) {
    return;
  }


  if (
    users.length === 0
  ) {

    list.innerHTML = `

      <div class="card zeng-chat-empty">

        No other learners are available yet.

        <br>

        Create another account to test
        user-to-user chat.

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
                    border-radius:50%;
                  "
                >`
                :
                "👤"
              }
            </div>


            <div class="zeng-user-info">

              <div class="zeng-user-name">
                ${escapeHTML(
                  user.displayName ||
                  "Learner"
                )}
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


              ${
                conversation.lastMessage
                ?
                `
                  <div class="zeng-user-preview">
                    ${escapeHTML(
                      conversation.lastSenderId ===
                      ChatState.currentUser?.uid
                      ?
                      "You: "
                      :
                      ""
                    )}
                    ${escapeHTML(
                      formatPreview(
                        conversation.lastMessage
                      )
                    )}
                  </div>
                `
                :
                ""
              }

            </div>


            <div class="zeng-user-right">

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
// MARK CHAT READ
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
// RENDER CHAT PAGE
// =========================================================

function renderChatHome(
  container
) {

  ChatState.selectedUser =
    null;

  ChatState.selectedChatId =
    null;

  ChatState.editingMessageId =
    null;


  if (
    ChatState.unsubscribeMessages
  ) {

    ChatState.unsubscribeMessages();

    ChatState.unsubscribeMessages =
      null;

  }


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

            <div class="zeng-chat-header-title">
              💬 English Chat
            </div>


            <div class="zeng-chat-header-text">
              Practice English with other learners.
              Select a user to start a conversation.
            </div>

          </div>


          <div
            style="
              margin-top:20px;
              font-size:18px;
              font-weight:800;
            "
          >
            Learners
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
                page: "dashboard"
              }
            }
          )
        );

      }
    );


  startUsersListener(
    () => {

      renderUserList(
        container
      );

    }
  );


  startConversationListener(
    () => {

      renderUserList(
        container
      );

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


  ChatState.selectedUser =
    selectedUser;


  ChatState.selectedChatId =
    getChatId(
      currentUid,
      selectedUser.id
    );


  ChatState.editingMessageId =
    null;


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

          <div
            class="zeng-conversation"
          >

            <div
              class="zeng-conversation-header"
              style="position:relative;"
            >

              <button
                type="button"
                class="zeng-conversation-back"
                id="zengConversationBack"
                aria-label="Back"
              >
                ←
              </button>


              <div class="zeng-user-avatar">
                ${
                  selectedUser.photoURL
                  ?
                  `<img
                    src="${escapeHTML(selectedUser.photoURL)}"
                    alt=""
                    style="
                      width:100%;
                      height:100%;
                      object-fit:cover;
                      border-radius:50%;
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
                  class="zeng-chat-menu-item danger"
                  id="zengBlockUserButton"
                >
                  🚫 Block user
                </button>

              </div>

            </div>


            <div
              id="zengMessages"
              class="zeng-messages"
            >

              <div class="zeng-chat-loading">
                Loading messages...
              </div>

            </div>


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

  `;


  // -------------------------------------------------------
  // Back
  // -------------------------------------------------------

  document
    .getElementById(
      "zengConversationBack"
    )
    ?.addEventListener(
      "click",
      () => {

        if (
          ChatState.unsubscribeMessages
        ) {

          ChatState.unsubscribeMessages();

          ChatState.unsubscribeMessages =
            null;

        }


        renderChatHome(
          container
        );

      }
    );


  // -------------------------------------------------------
  // Menu
  // -------------------------------------------------------

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


  // -------------------------------------------------------
  // Block
  // -------------------------------------------------------

  document
    .getElementById(
      "zengBlockUserButton"
    )
    ?.addEventListener(
      "click",
      async () => {

        const confirmed =
          window.confirm(
            `Block ${selectedUser.displayName || "this user"}?`
          );


        if (!confirmed) {

          return;

        }


        await blockUser(
          selectedUser.id
        );


        menuPanel?.classList.remove(
          "open"
        );


        if (
          ChatState.unsubscribeMessages
        ) {

          ChatState.unsubscribeMessages();

          ChatState.unsubscribeMessages =
            null;

        }


        renderChatHome(
          container
        );

      }
    );


  // -------------------------------------------------------
  // Close menu when clicking outside
  // -------------------------------------------------------

  document.addEventListener(
    "click",
    () => {

      menuPanel?.classList.remove(
        "open"
      );

    },
    {
      once: true
    }
  );


  // -------------------------------------------------------
  // Input
  // -------------------------------------------------------

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


  // -------------------------------------------------------
  // Messages listener
  // -------------------------------------------------------

  startMessagesListener(
    container,
    ChatState.selectedChatId
  );


  // -------------------------------------------------------
  // Mark existing conversation as read
  // -------------------------------------------------------

  const chatRef =
    doc(
      db,
      CHATS_COLLECTION,
      ChatState.selectedChatId
    );


  try {

    const chatSnap =
      await getDoc(
        chatRef
      );


    if (
      chatSnap.exists()
    ) {

      await markConversationRead(
        ChatState.selectedChatId
      );

    }

  } catch (error) {

    console.warn(
      "Unable to open chat:",
      error
    );

  }

}


// =========================================================
// START MESSAGES LISTENER
// =========================================================

function startMessagesListener(
  container,
  chatId
) {

  if (
    ChatState.unsubscribeMessages
  ) {

    ChatState.unsubscribeMessages();

  }


  const messagesRef =
    collection(
      db,
      CHATS_COLLECTION,
      chatId,
      "messages"
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

        renderMessages(
          container,
          snapshot.docs
            .map(
              (item) => ({
                id:
                  item.id,

                ...item.data()
              })
            )
        );


        // -------------------------------------------------
        // Mark incoming messages as seen
        // -------------------------------------------------

        const currentUid =
          ChatState.currentUser?.uid;


        const unseenIncoming =
          snapshot.docs.filter(
            (messageDoc) => {

              const data =
                messageDoc.data();


              return (
                data.receiverId ===
                  currentUid &&

                data.seen !== true
              );

            }
          );


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
                    <span class="zeng-seen"
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
                      data-message-menu="${escapeHTML(message.id)}"
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

        `;

      }
    ).join("");


  // -------------------------------------------------------
  // Message menu buttons
  // -------------------------------------------------------

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


  // -------------------------------------------------------
  // Scroll to bottom
  // -------------------------------------------------------

  messagesBox.scrollTop =
    messagesBox.scrollHeight;

}


// =========================================================
// SHOW MESSAGE MENU
// =========================================================

function showMessageMenu(
  container,
  messageId
) {

  const existing =
    document.getElementById(
      "zengMessageActionPopup"
    );


  existing?.remove();


  const popup =
    document.createElement(
      "div"
    );


  popup.id =
    "zengMessageActionPopup";


  popup.style.cssText = `

    position:fixed;

    right:18px;

    bottom:90px;

    z-index:100;

    background:var(--surface);

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


  setTimeout(
    () => {

      const close =
        (event) => {

          if (
            !popup.contains(
              event.target
            )
          ) {

            popup.remove();

            document.removeEventListener(
              "click",
              close
            );

          }

        };


      document.addEventListener(
        "click",
        close
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
          "messages",
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
// SEND MESSAGE
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


    const chatRef =
      doc(
        db,
        CHATS_COLLECTION,
        chatId
      );


    const messagesRef =
      collection(
        db,
        CHATS_COLLECTION,
        chatId,
        "messages"
      );


    const messageRef =
      doc(
        messagesRef
      );


    const now =
      serverTimestamp();


    await setDoc(
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


    await setDoc(
      chatRef,
      {

        participants: [
          currentUid,
          selectedUid
        ],

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

      },
      {
        merge:
          true
      }
    );


    input.value =
      "";

    input.style.height =
      "auto";

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


  try {

    sendButton.disabled =
      true;


    const messageRef =
      doc(
        db,
        CHATS_COLLECTION,
        chatId,
        "messages",
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


    // -----------------------------------------------------
    // Update last message preview only if this is the
    // latest message.
    // -----------------------------------------------------

    const messagesSnapshot =
      await getDocs(
        query(
          collection(
            db,
            CHATS_COLLECTION,
            chatId,
            "messages"
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
          arrayUnion(uid),

        updatedAt:
          serverTimestamp()

      }
    );


    ChatState.blockedUsers.add(
      uid
    );


    // -----------------------------------------------------
    // Remove unread state for this user locally.
    // -----------------------------------------------------

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

  }

}


// =========================================================
// PUBLIC RENDER FUNCTION
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
