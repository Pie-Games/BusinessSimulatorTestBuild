const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/0c01ad505ac94f384c94ae88998f5e03.loader.js",
    "Build/578916a4ec36f1fde49c0bb6efdd6c94.framework.js.br",
    "Build/4552615b796c9eb453f9e70fbf815f06.data.br",
    "Build/cc389615fa9464f92e2210fd1dd5ac0b.wasm.br",
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
