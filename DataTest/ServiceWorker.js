const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/df044548b40ab41a9741002f8a107a2f.loader.js",
    "Build/9289f84a8a5d00e93aa9a66a1d3022f1.framework.js.br",
    "Build/d27e3962fd428f230df389314096710a.data.br",
    "Build/1a4289ddfd061a9145088df3103025bd.wasm.br",
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
