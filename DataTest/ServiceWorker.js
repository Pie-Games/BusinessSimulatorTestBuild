const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/654e54379d346569419a6f740a682c22.loader.js",
    "Build/823c07ca60dea0463561402e0194134f.framework.js.br",
    "Build/1e2da8c4c100fbfeb0f916940ef9b8f6.data.br",
    "Build/6a3a9812e9abe40c8499bc638498db8f.wasm.br",
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
