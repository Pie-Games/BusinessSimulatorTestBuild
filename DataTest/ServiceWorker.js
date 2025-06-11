const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/0a50c9a8c9a213c92c1a05e134f818bc.loader.js",
    "Build/b905f02badb8cc53f0c9c9338b70cdf8.framework.js.br",
    "Build/339b16b8550c84e011d9fb81544389a9.data.br",
    "Build/9532395a58f28621ab56e6b00e636349.wasm.br",
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
