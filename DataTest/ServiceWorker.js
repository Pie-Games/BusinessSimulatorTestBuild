const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/97ca828053337794ec016d0b61d18188.loader.js",
    "Build/44034cb030cce5c0477b978cf5a3d274.framework.js.br",
    "Build/beffcd1d0c686218b056cade6099a371.data.br",
    "Build/37d6c3d0649d084ec32f1b539d0abb2b.wasm.br",
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
