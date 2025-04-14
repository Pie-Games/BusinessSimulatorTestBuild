const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/bf9bc2ec6f453b3945bc441e20206ece.loader.js",
    "Build/757023d57ff654fbec58846abfd79722.framework.js.br",
    "Build/5583e1bf9eae6da0cdb9ad499bd39199.data.br",
    "Build/333d95111cb52132449650ac681e1cd3.wasm.br",
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
