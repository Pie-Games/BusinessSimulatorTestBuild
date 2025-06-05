const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/be299c352788bdf3fffe35b3237b9fda.loader.js",
    "Build/0be6f1384ad9b4ba7f7ab2f4ab6fc430.framework.js.br",
    "Build/6413f43fbed4caf18b8e6da15a235c44.data.br",
    "Build/5230514bdca140cecb7838d51715b5b8.wasm.br",
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
