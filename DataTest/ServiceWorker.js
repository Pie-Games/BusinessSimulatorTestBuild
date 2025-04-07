const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/bf4b0f53eae722c450e468e7fb743984.loader.js",
    "Build/8f9d85b430f0c338cc96169f194e692e.framework.js.unityweb",
    "Build/da546ba5a02f6347157375127f4e5132.data.unityweb",
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
