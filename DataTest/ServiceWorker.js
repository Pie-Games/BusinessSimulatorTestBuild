const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/1240c82087080706f0d3672dd7592f3b.loader.js",
    "Build/54297b1554b7c8490bbe95050af8b46e.framework.js.br",
    "Build/ffec3fab6e5761d5adfdb5fd9cd291c7.data.br",
    "Build/dd91f7679d69df27adc8a689fabf0f5b.wasm.br",
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
