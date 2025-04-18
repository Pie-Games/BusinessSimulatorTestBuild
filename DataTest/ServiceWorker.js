const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/eb3b4af476178ea3ca8a2a4a874f2ba7.loader.js",
    "Build/328a24bb8487ded41dff20581a4f2bf4.framework.js.br",
    "Build/cc50bf85f22e7d93f47030f885d00ceb.data.br",
    "Build/be3b677ad3d423e0cfd7177f46ef4413.wasm.br",
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
