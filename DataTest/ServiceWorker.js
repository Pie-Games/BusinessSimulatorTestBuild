const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/58586542932cea19b9d443433613f5a5.loader.js",
    "Build/168d3c2f3d427f4c8cd5e8727f03bcf8.framework.js.br",
    "Build/72b7ca0202645526a5128ef650886d62.data.br",
    "Build/9b0fca6bb494a524440f7008db96bed5.wasm.br",
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
