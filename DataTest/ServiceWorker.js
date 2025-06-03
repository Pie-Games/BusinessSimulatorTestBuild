const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/55861d336eee088d3815b3ed032f1f4d.loader.js",
    "Build/d9a62a3eb8308df72c737b56f7360dbe.framework.js.br",
    "Build/67576f7bd85acb85fde33b2b302414be.data.br",
    "Build/ccfa241b4f7b93395a8961d71cd4093c.wasm.br",
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
