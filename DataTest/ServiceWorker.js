const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/cc55fba2593cb84625977a8f2fe130d4.loader.js",
    "Build/be4e941815ad512e4a0b227413b62c66.framework.js.br",
    "Build/dea3a06f7f28f4d41a8bb77eb9e9e30f.data.br",
    "Build/43ec3a1ee7fe2bd4a300c61a0a64d95c.wasm.br",
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
