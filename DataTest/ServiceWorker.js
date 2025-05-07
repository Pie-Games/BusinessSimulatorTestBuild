const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/c9ed4950d2e04d3028285cadbb224dfb.loader.js",
    "Build/ef210461528cc5b6937355ca2856f819.framework.js.br",
    "Build/e3489020cc2e4248aae081da3087cbde.data.br",
    "Build/5756522f2f4975d5c6740082ac93ca6e.wasm.br",
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
