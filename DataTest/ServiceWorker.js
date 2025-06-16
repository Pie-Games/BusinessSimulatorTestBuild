const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/3065cc324e4802d1eb34244ab68ee4bf.loader.js",
    "Build/c113a9b02a1bd7c963b756a739970e5a.framework.js.br",
    "Build/846b9c496d126e67fee229a227720648.data.br",
    "Build/ccbb0f8ac6b6d8f466cd64a93ba986a7.wasm.br",
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
