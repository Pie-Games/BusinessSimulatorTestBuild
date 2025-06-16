const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/bae518cb058674c741a3a1b68f79a9de.loader.js",
    "Build/7d4d1fa1eb0daf20c168abd55de46cb0.framework.js.br",
    "Build/20877568bfd8837e77e219b2deb49428.data.br",
    "Build/ad0b89e48ad0c0ece13349fd9ff33df5.wasm.br",
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
