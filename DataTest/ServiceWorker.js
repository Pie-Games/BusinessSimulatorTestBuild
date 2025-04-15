const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/0478c2352264d2851081f6f901ba7000.loader.js",
    "Build/14f025134925851fa64c348fcdb48a51.framework.js.br",
    "Build/ec8d8e4ef71f150df51b9e282ecbbdad.data.br",
    "Build/8dce1a645debd5cf813774207cb93d65.wasm.br",
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
