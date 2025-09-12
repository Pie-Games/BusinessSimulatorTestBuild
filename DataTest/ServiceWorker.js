const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/2c2121b627a7a1f35c12919920d02097.loader.js",
    "Build/c3cd49bd26cfc38b87534781bba8a862.framework.js.br",
    "Build/269c8c2521ba2964b0d9a56b456a0145.data.br",
    "Build/b6dd16a552c1cfc239bdfa2d26d8340d.wasm.br",
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
