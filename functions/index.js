// =========================================================
// ZenG English Learn
// Firebase Cloud Functions
// FCM Chat Notifications
// =========================================================

const {
  setGlobalOptions
} = require("firebase-functions");

const {
  onDocumentCreated
} = require("firebase-functions/v2/firestore");

const {
  initializeApp
} = require("firebase-admin/app");

const {
  getFirestore
} = require("firebase-admin/firestore");

const {
  getMessaging
} = require("firebase-admin/messaging");


// =========================================================
// FIREBASE ADMIN INITIALIZATION
// =========================================================

initializeApp();

const db =
  getFirestore();

const messaging =
  getMessaging();


// =========================================================
// GLOBAL OPTIONS
// =========================================================

setGlobalOptions({
  maxInstances: 10
});


// =========================================================
// COLLECTIONS
// =========================================================

const USERS_COLLECTION =
  "zeng_englearn_users";

const DEVICE_TOKENS_COLLECTION =
  "zeng_englearn_device_tokens";


// =========================================================
// CHAT MESSAGE NOTIFICATION
// =========================================================

exports.sendChatNotification =
  onDocumentCreated(
    "chats/{chatId}/messages/{messageId}",
    async (event) => {

      // -----------------------------------------------------
      // GET MESSAGE
      // -----------------------------------------------------

      const messageSnapshot =
        event.data;


      if (!messageSnapshot) {

        console.warn(
          "Chat notification: message snapshot missing."
        );

        return null;

      }


      const message =
        messageSnapshot.data();


      if (!message) {

        console.warn(
          "Chat notification: message data missing."
        );

        return null;

      }


      // -----------------------------------------------------
      // MESSAGE INFORMATION
      // -----------------------------------------------------

      const senderId =
        message.senderId;

      const receiverId =
        message.receiverId;

      const chatId =
        event.params.chatId;


      const messageText =
        String(
          message.text || ""
        ).trim();


      // -----------------------------------------------------
      // VALIDATE MESSAGE
      // -----------------------------------------------------

      if (
        !senderId ||
        !receiverId ||
        !chatId
      ) {

        console.warn(
          "Chat notification: required message fields missing.",
          {
            senderId,
            receiverId,
            chatId
          }
        );

        return null;

      }


      // -----------------------------------------------------
      // NEVER NOTIFY THE SENDER
      // -----------------------------------------------------

      if (
        senderId ===
        receiverId
      ) {

        console.warn(
          "Chat notification skipped: sender and receiver are the same."
        );

        return null;

      }


      // =====================================================
      // GET SENDER PROFILE
      // =====================================================

      let senderName =
        "New message";


      try {

        const senderRef =
          db
            .collection(
              USERS_COLLECTION
            )
            .doc(
              senderId
            );


        const senderSnapshot =
          await senderRef.get();


        if (
          senderSnapshot.exists
        ) {

          const senderData =
            senderSnapshot.data();


          senderName =
            String(
              senderData?.displayName ||
              "New message"
            ).trim() ||
            "New message";

        }

      } catch (error) {

        console.warn(
          "Unable to load sender profile:",
          error
        );

      }


      // =====================================================
      // GET RECEIVER DEVICE TOKENS
      // =====================================================

      const tokenRef =
        db
          .collection(
            DEVICE_TOKENS_COLLECTION
          )
          .doc(
            receiverId
          );


      const tokenSnapshot =
        await tokenRef.get();


      if (
        !tokenSnapshot.exists
      ) {

        console.log(
          "No FCM device tokens found for receiver:",
          receiverId
        );

        return null;

      }


      const tokenData =
        tokenSnapshot.data();


      let tokens =
        Array.isArray(
          tokenData?.tokens
        )
          ? tokenData.tokens
          : [];


      // -----------------------------------------------------
      // REMOVE EMPTY / INVALID VALUES
      // -----------------------------------------------------

      tokens =
        tokens.filter(
          (token) =>
            typeof token === "string" &&
            token.trim().length > 0
        );


      if (
        tokens.length === 0
      ) {

        console.log(
          "Receiver has no valid FCM tokens:",
          receiverId
        );

        return null;

      }


      // =====================================================
      // MAX 500 TOKENS PER MULTICAST
      // =====================================================

      const tokenBatches = [];


      for (
        let i = 0;
        i < tokens.length;
        i += 500
      ) {

        tokenBatches.push(
          tokens.slice(
            i,
            i + 500
          )
        );

      }


      // =====================================================
      // SEND NOTIFICATIONS
      // =====================================================

      const invalidTokens =
        [];


      for (
        const batch of tokenBatches
      ) {

        try {

          const response =
            await messaging.sendEachForMulticast({

              tokens:
                batch,

              notification: {

                title:
                  senderName,

                body:
                  messageText ||
                  "You received a new message."

              },

              data: {

                type:
                  "chat_message",

                chatId:
                  String(chatId),

                senderId:
                  String(senderId),

                receiverId:
                  String(receiverId),

                messageId:
                  String(
                    messageSnapshot.id
                  )

              },

              webpush: {

                notification: {

                  title:
                    senderName,

                  body:
                    messageText ||
                    "You received a new message.",

                  icon:
                    "/ZenG-Englearn/icons/icon-192.png",

                  badge:
                    "/ZenG-Englearn/icons/icon-192.png"

                }

              }

            });


          // -------------------------------------------------
          // CHECK FAILED TOKENS
          // -------------------------------------------------

          response.responses.forEach(
            (result, index) => {

              if (
                !result.success
              ) {

                const errorCode =
                  result.error?.code ||
                  "";


                if (

                  errorCode ===
                    "messaging/registration-token-not-registered"

                  ||

                  errorCode ===
                    "messaging/invalid-registration-token"

                ) {

                  invalidTokens.push(
                    batch[index]
                  );

                }

              }

            }
          );


          console.log(
            "FCM notification result:",
            {
              receiverId,

              successCount:
                response.successCount,

              failureCount:
                response.failureCount
            }
          );


        } catch (error) {

          console.error(
            "FCM notification send error:",
            error
          );

        }

      }


      // =====================================================
      // REMOVE INVALID TOKENS
      // =====================================================

      if (
        invalidTokens.length > 0
      ) {

        const cleanedTokens =
          tokens.filter(
            (token) =>
              !invalidTokens.includes(
                token
              )
          );


        try {

          await tokenRef.set(
            {

              tokens:
                cleanedTokens,

              updatedAt:
                new Date()

            },
            {
              merge: true
            }
          );


          console.log(
            "Removed invalid FCM tokens:",
            invalidTokens.length
          );


        } catch (error) {

          console.warn(
            "Unable to clean invalid FCM tokens:",
            error
          );

        }

      }


      return null;

    }
  );
