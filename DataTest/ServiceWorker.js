const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9b8a154124135451f02ba05d0b1e45b7.loader.js",
    "Build/ff69b907dd986381f731be5483a1487a.framework.js.br",
    "Build/780f3ba3198a202655fe023901279694.data.br",
    "Build/3d872b43b93735cf61f7b54eb7419cf2.wasm.br",
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
