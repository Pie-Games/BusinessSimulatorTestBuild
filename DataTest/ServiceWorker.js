const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/c48a00d01f25e6b9b7e155746ecfc1bb.loader.js",
    "Build/ea1ae8a2b4b0c514c14070cdeec69b80.framework.js.br",
    "Build/df0535d4ec8d7771ef677f514f554b51.data.br",
    "Build/1bccab823571baabdafb807576fbb209.wasm.br",
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
