const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/55508437ec42cad4c104e2328a8573a2.loader.js",
    "Build/ebb7c015780aa486291b30fb5e1f3bc4.framework.js.br",
    "Build/68ff52c8c6b4509a405f32f1f8e850b0.data.br",
    "Build/b0022bd03c513c56b319bdaa8ae37d0b.wasm.br",
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
