const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/158087c69a47af159acf1ec0991c8b79.loader.js",
    "Build/7d4d1fa1eb0daf20c168abd55de46cb0.framework.js.br",
    "Build/2667845623011f32da380c8cd01e1a77.data.br",
    "Build/188d9a167e535e2659f693ca3ca72996.wasm.br",
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
