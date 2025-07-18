const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/146ac6195ad04b02122ddccc7dd8fe4a.loader.js",
    "Build/ea1ae8a2b4b0c514c14070cdeec69b80.framework.js.br",
    "Build/0799b35de583c5691f96d13b21f2128b.data.br",
    "Build/4380ee41d1d33e6d6e68159179a56247.wasm.br",
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
