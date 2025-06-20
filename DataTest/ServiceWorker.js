const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/b283cbe7b5ce4d40bcf6f86badf3c2c7.loader.js",
    "Build/8763b3a7aeebf490975dc652b65f812d.framework.js.br",
    "Build/8fb420c6518e758797fe52b5e4f4263a.data.br",
    "Build/1986a5acef8a01d73b9b720b71becb91.wasm.br",
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
