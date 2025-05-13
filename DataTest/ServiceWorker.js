const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/302a92518b534ebfedd1dc20e533ec76.loader.js",
    "Build/6e71a4a05de8e8f6fefae1e78ddad18e.framework.js.br",
    "Build/b8440cdcdcc9e4460dd1606f71e4389f.data.br",
    "Build/0d2becb4be8c76bc879bd41d332638b7.wasm.br",
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
