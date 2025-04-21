const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/a334c363ce20a7373cf2260ca236a934.loader.js",
    "Build/13063ba6d3da62fa087878f5be35be45.framework.js.br",
    "Build/f29b722c2f0a1de2f9c77f098c8d31b6.data.br",
    "Build/c05287985d3d8ca0615fcafa3dd83f36.wasm.br",
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
