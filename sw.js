// =========================================================
// ZenG English Learn
// Stable Service Worker + Firebase Cloud Messaging
// =========================================================


// =========================================================
// CACHE
// =========================================================

const CACHE_NAME =
  "zeng-englearn-shell-v4";


// =========================================================
// FIREBASE COMPAT LIBRARIES
// =========================================================
//
// Firebase Messaging background handling is initialized
// inside this service worker.
//
// =========================================================

importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js"
);


// =========================================================
// FIREBASE CONFIG
// =========================================================

firebase.initializeApp({

  apiKey:
    "AIzaSyCes4Ir1Q_QHpLlhCqAPWKLMpA9Zez6cyY",

  authDomain:
    "zeng-chatt.firebaseapp.com",

  databaseURL:
    "https://zeng-chatt-default-rtdb.firebaseio.com",

  projectId:
    "zeng-chatt",

  storageBucket:
    "zeng-chatt.firebasestorage.app",

  messagingSenderId:
    "1042057290439",

  appId:
    "1:1042057290439:web:b3c41daf4b59564bdd94e2"

});


// =========================================================
// FIREBASE MESSAGING
// =========================================================

const messaging =
  firebase.messaging();


// =========================================================
// BACKGROUND MESSAGE
// =========================================================
//
// This runs when the ZenG web app is in the background
// or the page is not currently active.
//
// =========================================================

messaging.onBackgroundMessage(
  (payload) => {

    console.log(
      "ZenG background FCM message:",
      payload
    );


    const notification =
      payload.notification || {};


    const data =
      payload.data || {};


    const title =
      notification.title ||
      data.senderName ||
      "ZenG English Learn";


    const body =
      notification.body ||
      "You received a new message.";


    const notificationOptions = {

      body,

      icon:
        notification.icon ||
        "/ZenG-Englearn/icons/icon-192.png",

      badge:
        notification.badge ||
        "/ZenG-Englearn/icons/icon-192.png",

      data: {

        type:
          data.type ||
          "chat_message",

        chatId:
          data.chatId ||
          "",

        senderId:
          data.senderId ||
          "",

        messageId:
          data.messageId ||
          ""

      }

    };


    return self.registration.showNotification(
      title,
      notificationOptions
    );

  }
);


// =========================================================
// NOTIFICATION CLICK
// =========================================================

self.addEventListener(
  "notificationclick",
  (event) => {

    event.notification.close();


    const notificationData =
      event.notification.data || {};


    const chatId =
      notificationData.chatId ||
      "";


    const targetURL =
      chatId
        ? `/ZenG-Englearn/?chatId=${encodeURIComponent(chatId)}`
        : "/ZenG-Englearn/";


    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      })

        .then(
          (clientList) => {

            // -------------------------------------------------
            // Try to reuse an already-open ZenG window
            // -------------------------------------------------

            for (
              const client of clientList
            ) {

              if (
                "focus" in client
              ) {

                return client
                  .focus()
                  .then(
                    () => {

                      if (
                        "navigate" in client
                      ) {

                        return client.navigate(
                          targetURL
                        );

                      }

                    }
                  );

              }

            }


            // -------------------------------------------------
            // Otherwise open ZenG
            // -------------------------------------------------

            if (
              clients.openWindow
            ) {

              return clients.openWindow(
                targetURL
              );

            }

            return null;

          }
        )

    );

  }
);


// =========================================================
// INSTALL
// =========================================================

self.addEventListener(
  "install",
  (event) => {

    event.waitUntil(
      self.skipWaiting()
    );

  }
);


// =========================================================
// ACTIVATE
// =========================================================

self.addEventListener(
  "activate",
  (event) => {

    event.waitUntil(

      caches.keys()

        .then(
          (cacheNames) => {

            return Promise.all(

              cacheNames

                .filter(
                  (cacheName) =>
                    cacheName !== CACHE_NAME
                )

                .map(
                  (cacheName) =>
                    caches.delete(
                      cacheName
                    )
                )

            );

          }
        )

        .then(
          () => {

            return self.clients.claim();

          }
        )

    );

  }
);


// =========================================================
// IMPORTANT
// =========================================================
//
// No fetch interception.
//
// Firebase modules, application JS, CSS, HTML and external
// Firebase CDN files will continue to be loaded directly
// by the browser.
//
// =========================================================
