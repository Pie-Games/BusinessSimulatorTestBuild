const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9465a253a26a1f465c222155f553696d.loader.js",
    "Build/757023d57ff654fbec58846abfd79722.framework.js.br",
    "Build/53c028306de21a3a482f726f28997cf4.data.br",
    "Build/15516eae155acbd56f9371deed11d8fa.wasm.br",
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
