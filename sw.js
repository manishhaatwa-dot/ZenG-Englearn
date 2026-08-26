// =========================================================
// ZenG English Learn
// PWA Service Worker + Firebase Cloud Messaging
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
//
// This is the PUBLIC Firebase Web configuration.
// Never put Firebase Admin credentials or private keys here.
//

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
// CACHE
// =========================================================

const CACHE_NAME =
  "zeng-englearn-shell-v2";


const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css"
];


// =========================================================
// INSTALL
// =========================================================

self.addEventListener(
  "install",
  (event) => {

    event.waitUntil(

      caches.open(
        CACHE_NAME
      )
      .then(
        (cache) =>
          cache.addAll(
            APP_SHELL
          )
      )
      .then(() => {

        return self.skipWaiting();

      })

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
                    cacheName !==
                    CACHE_NAME
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
        .then(() => {

          return self.clients.claim();

        })

    );

  }
);


// =========================================================
// FCM BACKGROUND MESSAGE
// =========================================================
//
// This runs when the web app is in the background or closed.
//

messaging.onBackgroundMessage(
  (payload) => {

    console.log(
      "ZenG background message:",
      payload
    );


    const notification =
      payload.notification || {};


    const data =
      payload.data || {};


    const title =
      notification.title ||
      data.title ||
      "ZenG English Learn";


    const body =
      notification.body ||
      data.body ||
      "You have a new message.";


    const icon =
      notification.icon ||
      data.icon ||
      "./icons/icon-192.png";


    const badge =
      notification.badge ||
      data.badge ||
      "./icons/icon-192.png";


    const targetUrl =
      data.url ||
      "./index.html";


    const notificationOptions = {

      body,

      icon,

      badge,

      tag:
        data.chatId
          ? `zeng-chat-${data.chatId}`
          : "zeng-notification",

      renotify:
        true,

      data: {
        url:
          targetUrl,

        chatId:
          data.chatId || "",

        senderId:
          data.senderId || "",

        type:
          data.type || "message"
      }

    };


    return self.registration
      .showNotification(
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


    const targetUrl =
      notificationData.url ||
      "./index.html";


    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(
        (clientList) => {

          // -----------------------------------------------
          // If ZenG is already open, focus it.
          // -----------------------------------------------

          for (
            const client of clientList
          ) {

            if (
              "focus" in client
            ) {

              return client.focus();

            }

          }


          // -----------------------------------------------
          // Otherwise open the app.
          // -----------------------------------------------

          if (
            clients.openWindow
          ) {

            return clients.openWindow(
              targetUrl
            );

          }

          return null;

        }
      )

    );

  }
);


// =========================================================
// FETCH
// =========================================================

self.addEventListener(
  "fetch",
  (event) => {

    const request =
      event.request;


    if (
      request.method !== "GET"
    ) {
      return;
    }


    const requestURL =
      new URL(
        request.url
      );


    // -----------------------------------------------------
    // Firebase / external requests are not intercepted.
    // -----------------------------------------------------

    if (
      requestURL.origin !==
      self.location.origin
    ) {

      return;

    }


    // -----------------------------------------------------
    // Local app shell
    // -----------------------------------------------------

    event.respondWith(

      caches.match(
        request
      )
      .then(
        (cachedResponse) => {

          if (
            cachedResponse
          ) {

            return cachedResponse;

          }


          return fetch(
            request
          )
          .then(
            (networkResponse) => {

              if (
                !networkResponse ||
                networkResponse.status !== 200
              ) {

                return networkResponse;

              }


              const responseClone =
                networkResponse.clone();


              caches.open(
                CACHE_NAME
              )
              .then(
                (cache) => {

                  cache.put(
                    request,
                    responseClone
                  );

                }
              );


              return networkResponse;

            }
          )
          .catch(() => {

            // ---------------------------------------------
            // Offline navigation fallback
            // ---------------------------------------------

            if (
              request.mode ===
              "navigate"
            ) {

              return caches.match(
                "./index.html"
              );

            }


            return new Response(
              "",
              {
                status: 503,
                statusText:
                  "Offline"
              }
            );

          });

        }
      )

    );

  }
);
