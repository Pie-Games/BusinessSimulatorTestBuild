const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/fc0eb8454572cf63b052004f062c6306.loader.js",
    "Build/63d6d780bec04b5d559815d644222a46.framework.js.br",
    "Build/96d3775eb64f250df5312f300c45c4c6.data.br",
    "Build/c40a1fcf1278f2f84b9926b667df8cea.wasm.br",
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
