const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/e3ccf06793489f56094d5aa5eb384507.loader.js",
    "Build/0c890aa87b17c3eff5d9f1a6941875cc.framework.js.br",
    "Build/44dd3a3912fbaabd3bbc5ce1c19b96ce.data.br",
    "Build/5b996ff2feb15e4286417015b5acc854.wasm.br",
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
