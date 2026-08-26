// =========================================================
// ZenG English Learn
// Stable Service Worker
// =========================================================

const CACHE_NAME = "zeng-englearn-shell-v4";


// =========================================================
// INSTALL
// =========================================================

self.addEventListener("install", (event) => {

  event.waitUntil(
    self.skipWaiting()
  );

});


// =========================================================
// ACTIVATE
// =========================================================

self.addEventListener("activate", (event) => {

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
                caches.delete(cacheName)
            )

        );

      })
      .then(() => {

        return self.clients.claim();

      })

  );

});


// =========================================================
// IMPORTANT
// =========================================================
//
// No fetch interception.
//
// Firebase modules, application JS, CSS, HTML and external
// Firebase CDN files will be loaded directly by the browser.
//
// Fetch interception will be added again later only after
// the basic application is completely stable.
//
