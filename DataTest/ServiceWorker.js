const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/542fe30f75a461411e61e2806a31ba2c.loader.js",
    "Build/0be6f1384ad9b4ba7f7ab2f4ab6fc430.framework.js.br",
    "Build/76b268e75e2f25e7a0737f09734d0f17.data.br",
    "Build/0589fdd02631421b551c3769e52e8589.wasm.br",
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
