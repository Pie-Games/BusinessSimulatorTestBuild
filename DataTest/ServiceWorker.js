const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/13de11c6f98c2d2cb46fd2969f11bd59.loader.js",
    "Build/b627c53cc61016841f25d363258b36c6.framework.js.br",
    "Build/2759747ca6a00de39347437ac6ba440f.data.br",
    "Build/fff43e91714cf8280cbe3133e137e8a9.wasm.br",
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
