const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/2b60182c489266f904c0714f03dc4a24.loader.js",
    "Build/5726f130f61748f70f40a4402be17a7e.framework.js.br",
    "Build/05b94815341c4dde0472c163b655cbcf.data.br",
    "Build/3fc2aa6de3e8a2042f24d438505d84e4.wasm.br",
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
