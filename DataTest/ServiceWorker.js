const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/c9a865b00b1bfe9c5ae7f2350cd68174.loader.js",
    "Build/23300c405f791485032c9d32f3ceda1c.framework.js.br",
    "Build/74a1431e3924ed1e2605d3d14c368904.data.br",
    "Build/cd2647c33a173ec476785c42f1a78d1e.wasm.br",
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
