const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5a2b08f1dc2f4718d7dda23ad6f5535f.loader.js",
    "Build/7bc9d5fc3f1adf5056870202f43bebe3.framework.js.br",
    "Build/a15291e55e360cd3290ae7031290f339.data.br",
    "Build/bb60377d7170a4cd40edc6d6adef6eb8.wasm.br",
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
