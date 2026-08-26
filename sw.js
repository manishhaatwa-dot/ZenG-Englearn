// =========================================================
// ZenG English Learn
// Stable PWA Service Worker
// =========================================================

const CACHE_NAME =
  "zeng-englearn-shell-v3";


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


    // Only GET requests
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
    // Only handle files from our own GitHub Pages origin.
    // Firebase/CDN requests must go directly to network.
    // -----------------------------------------------------

    if (
      requestURL.origin !==
      self.location.origin
    ) {

      return;

    }


    event.respondWith(

      caches.match(
        request
      )
      .then((cachedResponse) => {

        if (
          cachedResponse
        ) {

          return cachedResponse;

        }


        return fetch(
          request
        );

      })
      .catch(() => {

        // -------------------------------------------------
        // Offline navigation fallback
        // -------------------------------------------------

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

      })

    );

  }
);
