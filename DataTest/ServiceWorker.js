const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/0be91c431e470adccf79690dc182b904.loader.js",
    "Build/2d05386363f1bbf418c0c35641e26a2d.framework.js.br",
    "Build/2e549c68ad850cdfc6db927a49547a53.data.br",
    "Build/3535236b6e60d84dc0dac3788248a4a1.wasm.br",
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
