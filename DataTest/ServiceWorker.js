const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/12b76270ed77e92090dbe0dba4eb50e3.loader.js",
    "Build/74e6f5ab510729f54527ed6788fd7ffd.framework.js.br",
    "Build/9d736d9e5c23e3944016469f1cb148d7.data.br",
    "Build/79966776c969c420454a35384dcf080b.wasm.br",
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
