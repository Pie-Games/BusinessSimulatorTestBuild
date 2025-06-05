const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/632f20a4845c7b105c342637be5267d1.loader.js",
    "Build/fffa5b0d9b334cd12b0ba53b584ad0c1.framework.js.br",
    "Build/c98cd427202f49ec42a3ffa1dd9dfea1.data.br",
    "Build/66f22f0c3eec295d0e9973d5197b77be.wasm.br",
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
