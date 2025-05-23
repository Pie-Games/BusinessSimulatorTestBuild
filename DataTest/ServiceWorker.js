const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/82ecd25385bfc01e5369f2897f23ec29.loader.js",
    "Build/74f89621da4e807048f1f1e7c47ece97.framework.js.br",
    "Build/7154c9fd0bf030b0e9ba8b3282b2d9bf.data.br",
    "Build/665b8b782ba897e6aaf89d0e553bc13a.wasm.br",
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
