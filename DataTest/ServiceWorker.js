const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/3b00863c10acb092ba4df831b59f8ef8.loader.js",
    "Build/25982e0030f6185804c04b58e92dbe1e.framework.js.br",
    "Build/78b9d46f31c8fe3c8aec9156e6dfba00.data.br",
    "Build/4b7137efcd944a63e0d521ea6822c7b7.wasm.br",
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
