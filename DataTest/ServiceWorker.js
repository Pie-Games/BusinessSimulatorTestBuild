const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/c4286d06bd5ae65bdd9d135f3a58e536.loader.js",
    "Build/c8b4e2f6c4257347200f4692dca6ba82.framework.js.br",
    "Build/bee1a1acff5454f860ff327f10934866.data.br",
    "Build/8593d7729148647769e1b78e89e98e82.wasm.br",
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
