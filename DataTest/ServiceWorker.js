const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/80b1468fe1208e01d1be7e49b41a131f.loader.js",
    "Build/f1320e9e8f72a22c323139f24e6566d6.framework.js.br",
    "Build/c7b03765d294ed0b9b7be86cd1735dc2.data.br",
    "Build/15f7d5e5b7b72a73fa1b1276d96100f0.wasm.br",
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
