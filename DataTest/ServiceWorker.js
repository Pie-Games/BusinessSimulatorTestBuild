const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/65fa1453ff700f0a57dfa5d04b754cde.loader.js",
    "Build/c3cd49bd26cfc38b87534781bba8a862.framework.js.br",
    "Build/b8fd04169953092fad123b53765c2030.data.br",
    "Build/3aa47bd330b8a146227cf658e391976c.wasm.br",
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
