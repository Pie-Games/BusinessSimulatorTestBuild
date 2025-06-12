const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/824fc1a128c0924b67f296e6fd7a09c2.loader.js",
    "Build/54a021edf864859ac16f5543c99a048e.framework.js.br",
    "Build/54ba74ecd03e57971115c3ae4ef1c393.data.br",
    "Build/1c484dc322f16fc68503e87c43ac0f9f.wasm.br",
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
