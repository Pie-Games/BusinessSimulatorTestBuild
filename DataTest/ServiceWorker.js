const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/e17ce5815cca3bab754a0ff0e8593789.loader.js",
    "Build/77bf65ef92fb2859df8cd1fe7fec8b00.framework.js.br",
    "Build/8418ecd69142a924707273ed204d27e5.data.br",
    "Build/1454e2492c0338482e91f2a53bc886b5.wasm.br",
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
