const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/209600928a38f166117444172e4b5914.loader.js",
    "Build/e8c5ad8f089f215fe48de9243e928b05.framework.js.br",
    "Build/a54ab33a52c64a85552996486dd77f43.data.br",
    "Build/e2298d5390c5732e4c40815c37f9def3.wasm.br",
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
