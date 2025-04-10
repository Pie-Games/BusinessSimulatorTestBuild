const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9b55f718f10516ab5328bb8fa8b7a538.loader.js",
    "Build/0fb416e8fe14dca4e814b7b748338334.framework.js.br",
    "Build/ee09bd99e5d4d62f415465653fe42f8e.data.br",
    "Build/2c4439f537d6d01da5ed98022f534c6b.wasm.br",
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
