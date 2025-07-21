const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/cfe2296d2e77475e87d5197ad26b5667.loader.js",
    "Build/d43be50313f753e2667f17491b7fd132.framework.js.br",
    "Build/4cc1af317720606a05ca58033ed0eaf1.data.br",
    "Build/f4c73d6eb6c2c2847c62e30215c746a8.wasm.br",
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
