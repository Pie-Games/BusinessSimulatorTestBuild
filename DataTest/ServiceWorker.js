const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/0f8108858012d83db8982e18f2aa57fc.loader.js",
    "Build/df8d11799c8ffaa1e1410463726f8baa.framework.js.br",
    "Build/6af5c3af1231a5b4cda787838a37bd49.data.br",
    "Build/96195b9e226810bd37add90c93a61268.wasm.br",
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
