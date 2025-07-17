const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/21c7038133bcbd66c7084a62ac3b4c93.loader.js",
    "Build/c462aa4224d263ba41f981de5de5de51.framework.js.br",
    "Build/fdede253d79c093c3864392b01a9a6ac.data.br",
    "Build/b463f22ad8aaa3838d592b1b74ceb970.wasm.br",
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
