const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/ee2f545752400b3f3cdf7c52c0c70360.loader.js",
    "Build/45194168a30e37fcd7962338578c127c.framework.js.br",
    "Build/ba27868be782b22ec50edbe9e3868131.data.br",
    "Build/4cbb925197e5ce669549ce5d5df3c86f.wasm.br",
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
