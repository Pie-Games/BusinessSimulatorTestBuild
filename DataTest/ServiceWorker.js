const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/4f94d0996836d6ab8159a6c25b09c26a.loader.js",
    "Build/a4021392882177953fae53b7acac306f.framework.js.br",
    "Build/9a8e2446a4b19bed1af93fad5ba846f1.data.br",
    "Build/893038ddf7adc320a1a7bc801e4e2b37.wasm.br",
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
