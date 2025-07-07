const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/848b8e3f82646e6a790378f0346dbe38.loader.js",
    "Build/502691539ccb3520e8aa45ce12051f59.framework.js.br",
    "Build/af98bc995e7b4ffdf212f4e96de82742.data.br",
    "Build/2988a7ee6d565f7e961599579a5361b7.wasm.br",
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
