const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9853637125e801e9aae48e78dbbdcfca.loader.js",
    "Build/bc38974af4bf8b5f49523ab02b023c40.framework.js.unityweb",
    "Build/f7f2f44c34910ab25d34ab67731d0bb3.data.unityweb",
    "Build/0fe59aa7513d0821f5a67a1e8c675d96.wasm.unityweb",
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
