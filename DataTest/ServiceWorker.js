const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/e49f1c75c76f15641c5666c963d06799.loader.js",
    "Build/0cd2c9d30e96b8a3933371c9d823eee7.framework.js.br",
    "Build/db3375db9a07e35432ac2c093af8a1e7.data.br",
    "Build/5a8d0a46595f56b1fab32ac9b1645e8e.wasm.br",
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
