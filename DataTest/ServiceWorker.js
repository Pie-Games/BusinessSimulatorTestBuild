const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/b7c832fa38a2969eee8c250865f28a3c.loader.js",
    "Build/0a74755f3bdf7ed356dbeacd38f15fc4.framework.js.br",
    "Build/7d29973086e453fbefdfaad09dc00da0.data.br",
    "Build/12ff6236c80aafd60547c17c4b21b34d.wasm.br",
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
