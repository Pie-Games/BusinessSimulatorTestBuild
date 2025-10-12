const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/597590d0c527ebd3b818eedfd440ecd8.loader.js",
    "Build/c4a2142dfe78f45eddc41208f622b42f.framework.js.br",
    "Build/d4b212ed5b78a068ccd5044e63fd4c29.data.br",
    "Build/bbbbe395cf9f8e0cfaa2b493957ecf21.wasm.br",
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
