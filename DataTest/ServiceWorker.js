const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/94460657be4f1da438a6d7e20d0213ba.loader.js",
    "Build/244ec28308256027cb1d39c246ea7925.framework.js.br",
    "Build/9d41bc3937fae7e314194af6ef6dbe25.data.br",
    "Build/2acae236314d94464c00301270b9dfec.wasm.br",
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
