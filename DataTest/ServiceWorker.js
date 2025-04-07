const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/bf4b0f53eae722c450e468e7fb743984.loader.js",
    "Build/41d62ef8e53ed5089d49721ddaf79ce3.framework.js.unityweb",
    "Build/60088981d9183d3d249c05c5604602dc.data.unityweb",
    "Build/836492b300097c202446eadd2725a31d.wasm.unityweb",
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
