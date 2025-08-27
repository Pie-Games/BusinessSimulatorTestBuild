const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9a169ba5b1416b02b4857a60696dc3aa.loader.js",
    "Build/c9c6aaaee6a003e5ef442265945b00b9.framework.js.br",
    "Build/65db4acd0c5cacdc9e8aead597abfda6.data.br",
    "Build/35186898f50bdf5b40adb1e241cd5c5c.wasm.br",
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
