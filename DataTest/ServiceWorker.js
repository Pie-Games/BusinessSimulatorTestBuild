const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/1e4f31f22522225ffda3b6f6de047dfc.loader.js",
    "Build/711a82cd764424ac326958f098377d53.framework.js.br",
    "Build/e543429992f94e83377df5d62f5d5179.data.br",
    "Build/d2f05c7032af45a0cf1771aa1736ffce.wasm.br",
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
