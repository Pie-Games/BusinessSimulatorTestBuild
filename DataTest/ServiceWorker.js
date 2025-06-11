const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/c9f6967d18d326d05ac24351be5b7368.loader.js",
    "Build/b905f02badb8cc53f0c9c9338b70cdf8.framework.js.br",
    "Build/1378cc3c19d08a51a652a720161b11c5.data.br",
    "Build/37fe3b72a9d8cd90bece88cd71117796.wasm.br",
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
