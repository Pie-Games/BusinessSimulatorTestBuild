const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/37cfd34efecc2a5466fb3db52027be4d.loader.js",
    "Build/91f7c131ed20a123cb8f0e8b80dfba92.framework.js.br",
    "Build/7119cd079c6b3328068f1c36eeacb187.data.br",
    "Build/ed8cc039308f83013cfd2312aa90de9f.wasm.br",
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
