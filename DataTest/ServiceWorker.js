const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/643f40e70671d7eb0a0a089a346a323b.loader.js",
    "Build/ed07411d65645a546f052f9f049ffee3.framework.js.br",
    "Build/9382782eeaa9fd2044cd640a03e4bd87.data.br",
    "Build/53316e7090fb70748b1176ae3cc0634a.wasm.br",
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
