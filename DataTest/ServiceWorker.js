const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/d89b5e4841727861ae784c249b6de164.loader.js",
    "Build/bc6f96916125e52386dd7c724fb010e7.framework.js.br",
    "Build/4193b20b223fe8555718ebaa19b16767.data.br",
    "Build/03e9c7a59e8e96807b4ef0fddf86833a.wasm.br",
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
