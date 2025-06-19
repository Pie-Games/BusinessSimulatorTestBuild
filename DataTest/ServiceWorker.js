const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9b1f924c7d3df1b9bf8fe9f4578e5b2f.loader.js",
    "Build/25982e0030f6185804c04b58e92dbe1e.framework.js.br",
    "Build/b3f7860a36b01bab1f5dc9a74fbb7310.data.br",
    "Build/078fad12705f0f2ddcc5ab8bc2200a70.wasm.br",
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
