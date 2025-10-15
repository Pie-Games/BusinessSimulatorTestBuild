const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/a5246baa9017b6696b6346dca2f6a968.loader.js",
    "Build/a2584372565a36e35bc0680b6ca22c22.framework.js.br",
    "Build/0f9d1b5fdef1319c2f67e347636981cb.data.br",
    "Build/53c2032abff5d574024efc5aba8995df.wasm.br",
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
