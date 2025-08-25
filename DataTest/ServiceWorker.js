const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5ee436e69a5965e1aa80345539bec0da.loader.js",
    "Build/9173a5fcbbca468a3a4f84623b098869.framework.js.br",
    "Build/1fd04103276518bccb246ecb6c26d3fd.data.br",
    "Build/f210c06a11468214e8143cf142c492c6.wasm.br",
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
