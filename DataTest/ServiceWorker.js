const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/3c2b519e9b5932ac46c313e7f9af4c25.loader.js",
    "Build/53e490aa12d2f351876a86bbca782f8b.framework.js.br",
    "Build/8a8140af5cba2ca14454528a43e62338.data.br",
    "Build/ded4c8fec60fd686e351f462fb7f9174.wasm.br",
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
