const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9b80df7808d1a9a053f9aa58eb7b4334.loader.js",
    "Build/14f025134925851fa64c348fcdb48a51.framework.js.br",
    "Build/af5740dd4bba02d1206e054be3be7bb5.data.br",
    "Build/7a3eac681dcaac7060a2218637bbf518.wasm.br",
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
