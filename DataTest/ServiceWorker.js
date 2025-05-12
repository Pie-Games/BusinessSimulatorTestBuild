const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/66ff26a3446ffd3dc0762d6510719229.loader.js",
    "Build/44034cb030cce5c0477b978cf5a3d274.framework.js.br",
    "Build/c93dde0e3b73e62285ffd42159f5abf2.data.br",
    "Build/31aa1ea2f3f2fca32d3646a553e0b573.wasm.br",
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
