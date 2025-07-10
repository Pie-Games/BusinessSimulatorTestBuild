const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/70c1596dbbd0908b1cabf894348c81a3.loader.js",
    "Build/28ef0869aa2c0ec25acfd4a375392c72.framework.js.br",
    "Build/3de6e16d3c5881856cd980f09a018140.data.br",
    "Build/f6b954a22e1ff96c7a05aecd3ad3a906.wasm.br",
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
