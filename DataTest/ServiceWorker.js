const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/6b8d4e153e3fde50da698aa8c6ce25b6.loader.js",
    "Build/bc7d80c0a9b2895a3081771662d15edf.framework.js.br",
    "Build/d32e7f4020c82b0e52f192bc6d431380.data.br",
    "Build/5311e46609c75eb14e2f7f4d89d2d06f.wasm.br",
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
