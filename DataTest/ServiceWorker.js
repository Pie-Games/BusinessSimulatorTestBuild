const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/b7c5cbbbe9bb31d532b264b815955410.loader.js",
    "Build/9638f2169c5d6cc45563752e4a4fc741.framework.js.br",
    "Build/98bbf6b67073cf93f0ffbc0c2786eb4a.data.br",
    "Build/fbb3915e76a0fe63f74a2728f59b8be6.wasm.br",
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
