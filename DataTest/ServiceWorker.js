const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/97bde6ee9c272ae92fb7a97b6f16c473.loader.js",
    "Build/ac4a6e6a2873c75a5201b71b2a0bdca8.framework.js.br",
    "Build/fb61d56b5fd535025d048022c027458c.data.br",
    "Build/dbb995f39737d48397ad2f42deef8b8e.wasm.br",
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
