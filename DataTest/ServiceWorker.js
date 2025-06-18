const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/ca4c92845770a8d8b5673ea382351610.loader.js",
    "Build/f5c209f992461084786a0003fd214ee7.framework.js.br",
    "Build/8dd9a7e1d35e12bfe7d3643317f30dad.data.br",
    "Build/e9e1d848d70e044b00551b3191eaa5d5.wasm.br",
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
