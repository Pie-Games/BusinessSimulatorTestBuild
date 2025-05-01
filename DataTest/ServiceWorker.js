const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/d9e464679b7432a4460487f5fce0faf8.loader.js",
    "Build/31bec9f4907d93f20a63a794c28f3391.framework.js.br",
    "Build/19974ad7baf30b97d37d3964a8b08322.data.br",
    "Build/abc4eca3e189341e29fa030db5a2e536.wasm.br",
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
