const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/4734bd282c661feb41916ff4e3a78119.loader.js",
    "Build/09a979ded040977496a1b035c85909b9.framework.js.br",
    "Build/968b59af18f94b0d0a8de1bac7f6d307.data.br",
    "Build/7a9c5d7a269722909742a48db2f32e1f.wasm.br",
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
