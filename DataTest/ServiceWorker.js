const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9e3a0b00895b11c832c4137a93575520.loader.js",
    "Build/bc6f96916125e52386dd7c724fb010e7.framework.js.br",
    "Build/8981d8fc9dcb124f3305a04dc237181b.data.br",
    "Build/77c8e35924aacde7e56d9b37a9d26d78.wasm.br",
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
