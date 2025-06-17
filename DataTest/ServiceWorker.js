const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/ea78a2924f49e943d86366a797c9891a.loader.js",
    "Build/09a979ded040977496a1b035c85909b9.framework.js.br",
    "Build/fc74c079a0a7a403bc5110ebaae60ce7.data.br",
    "Build/28c00fc63519f3489cc10313be661488.wasm.br",
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
