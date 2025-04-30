const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/e151774eb316f0753e54359be3fb4a21.loader.js",
    "Build/a2b04afc0c2396f8b7de9d6fbe9d05e3.framework.js.br",
    "Build/e0d7b3020e4722b290762ca2421344b8.data.br",
    "Build/f38c015b4fc5debc8e8161bbe9aa84ba.wasm.br",
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
