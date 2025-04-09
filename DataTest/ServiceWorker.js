const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/1dd84c70c614bfd5eac13e44a563e022.loader.js",
    "Build/4f326fa67feeabddf08a53c8cc24b023.framework.js.br",
    "Build/1b0a22ebdb41bbb8cb78c2d78336b32d.data.br",
    "Build/00d060c8a09aebc9c18b8d068a7fc513.wasm.br",
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
