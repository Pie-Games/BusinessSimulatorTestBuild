const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/50812ab82fddf9af7adcb81bc1ae1024.loader.js",
    "Build/1c3c713e41c4cbb0f6b3ef35a3a56d0a.framework.js.br",
    "Build/715afb24325dd59d9f22586d46dfbdb2.data.br",
    "Build/37e81062ff77d7b619321780e715fd96.wasm.br",
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
