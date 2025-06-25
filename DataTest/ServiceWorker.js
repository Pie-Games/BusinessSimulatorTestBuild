const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/be2665f434567bdfbebb00fe586d6bbe.loader.js",
    "Build/9f7bb73a33903c67d606376be9543ae6.framework.js.br",
    "Build/01af8fd63b2475eccca5a26ec0c5a97c.data.br",
    "Build/2d5442c9717eca8a242cf6c28ea13831.wasm.br",
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
