const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/8d99c3ebbd8a078c6ff0f1332d4e33c9.loader.js",
    "Build/36e6dfb1dd519db149ecb004a94b5c6d.framework.js.br",
    "Build/d3f80a2abd345ebcb231c054bb95ab49.data.br",
    "Build/13b7da275d2f8c6955d6b07dbfefed31.wasm.br",
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
