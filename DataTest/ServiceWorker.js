const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/2713b7b110d0b928a9a5db6533059af7.loader.js",
    "Build/578916a4ec36f1fde49c0bb6efdd6c94.framework.js.br",
    "Build/23535c8e278603444ccfb60665fc70c4.data.br",
    "Build/446eaa53523c4058691bee790eafc6e7.wasm.br",
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
