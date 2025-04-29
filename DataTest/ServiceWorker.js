const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/1d0105597c9be134e90a99194df6caa7.loader.js",
    "Build/8356da0ec8553c9822082304e225966f.framework.js.br",
    "Build/c55373262077133d4ba41febaefa093a.data.br",
    "Build/10d91c57724671ff753d48aacf8a7cc6.wasm.br",
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
