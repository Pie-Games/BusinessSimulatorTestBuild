const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5893ec20afed8d5452a5c8be39614c0c.loader.js",
    "Build/dfc790b37e438bfcbdf96ff101a73096.framework.js.br",
    "Build/28aaf4e8dd668391670ea1f9c441256a.data.br",
    "Build/9d98375e86204c541b9c80ae6aa49aef.wasm.br",
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
