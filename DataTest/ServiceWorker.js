const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/eee9c96a3c841633dc3249971259cc33.loader.js",
    "Build/fc6a08837b3826186f07d6c925e44558.framework.js.br",
    "Build/891471d3529ae47fe051e29736d36a3c.data.br",
    "Build/2a749376b2cf0a823eb52cab652acd3a.wasm.br",
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
