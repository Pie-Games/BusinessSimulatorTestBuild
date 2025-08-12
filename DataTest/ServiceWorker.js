const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/ffd24b35b8ea561ec8f540c2b2a113e7.loader.js",
    "Build/39ccd236a50a42999e21ad0ec954afdd.framework.js.br",
    "Build/344a76a4d1aa105cc8df99856802dd72.data.br",
    "Build/ea4b825161f01a3ad90ef830e5c5102d.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
