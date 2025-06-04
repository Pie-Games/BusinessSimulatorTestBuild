const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/851b6dd9636105f19db973f38d57a068.loader.js",
    "Build/5b21374b557bd6d97b4c9a0ed56a63a7.framework.js.br",
    "Build/af61b9abcc6ffc4faa5e8ba411940677.data.br",
    "Build/27f65e43ad26e2291f25368ef740aa48.wasm.br",
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
