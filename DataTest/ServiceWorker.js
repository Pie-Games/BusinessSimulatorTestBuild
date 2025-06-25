const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/986ba345007d5e5f867ec074a65d2eb4.loader.js",
    "Build/f7a575a149be558722f265d18a2efc35.framework.js.br",
    "Build/c67e6b126b41e3c4815c16e0152a13e8.data.br",
    "Build/8d4e7a0bc32e9e7bd72e2ecf5dcc0c2a.wasm.br",
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
