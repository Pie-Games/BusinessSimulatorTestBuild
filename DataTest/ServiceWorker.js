const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/b678b5414f19de660a9a38c308c6e62f.loader.js",
    "Build/0bf7550b50f2f8f1d8f5f911531abb96.framework.js.br",
    "Build/dd1d0e87c422475ccd660989be2d266b.data.br",
    "Build/3489733895b2451b6def9671c5574e3a.wasm.br",
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
