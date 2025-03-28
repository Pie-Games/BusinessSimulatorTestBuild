const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9853637125e801e9aae48e78dbbdcfca.loader.js",
    "Build/eb539cade0602602ba103fd5d741f216.framework.js.unityweb",
    "Build/1a2c096bdc0ce493a8de8b9f815977e0.data.unityweb",
    "Build/3675afecf9cde658cca2fcd42fb6eb6e.wasm.unityweb",
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
