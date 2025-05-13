const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/58cd663ce0044c46077c7cd9ffee557c.loader.js",
    "Build/44034cb030cce5c0477b978cf5a3d274.framework.js.br",
    "Build/8681994af18cec41324423079cf765f1.data.br",
    "Build/2f029168a2be811200b7e302103c0870.wasm.br",
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
