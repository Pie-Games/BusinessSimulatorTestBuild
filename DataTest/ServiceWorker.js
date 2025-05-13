const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/c59a22bf30ff545ab043d7282b1a4c2c.loader.js",
    "Build/832a7880fc3e5d81a60c8d1718c8ea3b.framework.js.br",
    "Build/f96a190dc872016f70f5a4b190c87719.data.br",
    "Build/64b35ae46a301dbd0ae0b09c5890dda3.wasm.br",
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
