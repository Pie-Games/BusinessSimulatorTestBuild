const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/33e9f19ef9e4ac740a8aba5ba820fc8e.loader.js",
    "Build/f352be259d0fdb0c26d42ff9a78bac47.framework.js.br",
    "Build/0d3fb839c5a069211f073d95132b3b5e.data.br",
    "Build/df539783d7d3da7a3c94ba0699ce9529.wasm.br",
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
