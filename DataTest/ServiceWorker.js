const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/429d365f85d952f10d6db4d8eea5ed65.loader.js",
    "Build/871d8f4d03d1acb77c6a8d2b3da2db01.framework.js.br",
    "Build/220b6fbad3b647299500a051fc617fe4.data.br",
    "Build/4c38d1ab86eca6d8448a6bd6542e936f.wasm.br",
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
