const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/d37419d7f8661449b017255acb8edbfd.loader.js",
    "Build/57cf7580086c79cd6f887df411287e10.framework.js.br",
    "Build/77e7030e2e7a6e40e985632788298e53.data.br",
    "Build/119651a2718c99808a875e2b3c11e240.wasm.br",
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
