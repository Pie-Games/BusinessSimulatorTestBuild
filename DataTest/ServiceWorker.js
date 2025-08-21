const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/b7c5cbbbe9bb31d532b264b815955410.loader.js",
    "Build/ae48c8ecda2b86cb99392e7b35362c15.framework.js.br",
    "Build/eb2daf83c03c0312d83ec74fde119a7f.data.br",
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
