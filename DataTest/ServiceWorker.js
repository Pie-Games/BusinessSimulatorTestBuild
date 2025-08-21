const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/a1147759fe0f8e7639676ef51ed5988f.loader.js",
    "Build/6c7b9546a1c4e36ea0c2ce72e476c74d.framework.js.br",
    "Build/7038ece56eda4559cf47c295f171b29d.data.br",
    "Build/a0cbe9da75cc4e6d6df952b90009fb7f.wasm.br",
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
