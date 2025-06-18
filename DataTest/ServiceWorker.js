const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5893ec20afed8d5452a5c8be39614c0c.loader.js",
    "Build/50f4b2e0431cc49b4549e5ebab443c2f.framework.js.br",
    "Build/b918d3c6329359f0cf9ddb6af935d8a4.data.br",
    "Build/94b8cc7f68a2ef1ef83d4ddc4c668141.wasm.br",
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
