const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/faa9ff32ca1dac5ab358d1701e348abc.loader.js",
    "Build/0c890aa87b17c3eff5d9f1a6941875cc.framework.js.br",
    "Build/c9f4ed4e29d7a8cb25d5ff2b4bf57b05.data.br",
    "Build/601a35dff5108b8fb6fcdc00fd8e16eb.wasm.br",
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
