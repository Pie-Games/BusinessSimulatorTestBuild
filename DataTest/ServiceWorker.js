const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9509dc909468cc48b420b22fd2873083.loader.js",
    "Build/d43be50313f753e2667f17491b7fd132.framework.js.br",
    "Build/5197774162aed3f469ab57e1dcabdeb7.data.br",
    "Build/cc0004b1b63cc83eb53a868fe96afd9a.wasm.br",
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
