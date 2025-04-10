const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/ad3121349fc77dd86f8e3ff49019329b.loader.js",
    "Build/6eade63a2a3b9143a2a73d38e3e35ef7.framework.js.br",
    "Build/2d81ccbe8f37d8f48da88d596ae50f91.data.br",
    "Build/6a94ef6739eaba5a9bf29b5afe30521f.wasm.br",
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
