const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/2477a04629134283aec66417696e65e5.loader.js",
    "Build/c8b4e2f6c4257347200f4692dca6ba82.framework.js.br",
    "Build/6b4a99660f6c637b7bbda37f6b4d3c80.data.br",
    "Build/744f95f816e4c30c07f80e96e45631d2.wasm.br",
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
