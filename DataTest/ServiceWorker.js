const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/93b29786e74abad053c9d752a917c05d.loader.js",
    "Build/09a979ded040977496a1b035c85909b9.framework.js.br",
    "Build/de1ff5a06833545d6cb27cd6aa7d628b.data.br",
    "Build/ad51a19339c7950382c693ed736a2b5e.wasm.br",
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
