// =========================================================
// ZenG English Learn
// PWA Service Worker
// =========================================================

const CACHE_NAME =
  "zeng-englearn-shell-v1";


// =========================================================
// APP SHELL
// =========================================================
//
// Only stable local files are cached here.
// Firebase network resources are intentionally not cached.
//

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
      .then((cache) => {

        return cache.addAll(
          APP_SHELL
        );

      })
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
        .then((cacheNames) => {

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

        })
        .then(() => {

          return self.clients.claim();

        })

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


    // Only handle normal GET requests.
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
    // Don't intercept Firebase/API requests.
    // -----------------------------------------------------

    if (
      requestURL.origin !==
      self.location.origin
    ) {
      return;
    }


    // -----------------------------------------------------
    // Cache-first for local app files.
    // -----------------------------------------------------

    event.respondWith(

      caches.match(
        request
      )
      .then((cachedResponse) => {

        if (cachedResponse) {
          return cachedResponse;
        }


        return fetch(request)
          .then((networkResponse) => {

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
            .then((cache) => {

              cache.put(
                request,
                responseClone
              );

            });


            return networkResponse;

          })
          .catch(() => {

            // -------------------------------------------------
            // Offline navigation fallback
            // -------------------------------------------------

            if (
              request.mode === "navigate"
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

      })

    );

  }
);
