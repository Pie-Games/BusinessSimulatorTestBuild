const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/12eff2db9892d685b57b71d48a93ce53.loader.js",
    "Build/757023d57ff654fbec58846abfd79722.framework.js.br",
    "Build/a5804759af58e6031e3ebce4281e7e5b.data.br",
    "Build/cc40a914d9dcbb0b7642e2cb4d59603f.wasm.br",
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
