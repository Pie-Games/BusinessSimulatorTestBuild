const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/ae9b1a1e42b91c2dae47b70ad99903bd.loader.js",
    "Build/ff25bb4c28121d73321f5fda528e4d92.framework.js.br",
    "Build/9db4b2d028f3b7d0b5cd4e529ad9ae27.data.br",
    "Build/27057abc517242f2f538b365125decd8.wasm.br",
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
