const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/2d15a625d0fc1c2f88de442389ae920b.loader.js",
    "Build/67f4933f7aae5074881f071d9fbc034f.framework.js.br",
    "Build/ec902508c2636b5d962c5bf853483c1b.data.br",
    "Build/6281280d2f051a1f5a80b2d99737f372.wasm.br",
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
