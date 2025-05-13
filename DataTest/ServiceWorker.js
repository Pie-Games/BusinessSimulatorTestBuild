const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/57ed63e7bbce6a0883150141bc179b3f.loader.js",
    "Build/832a7880fc3e5d81a60c8d1718c8ea3b.framework.js.br",
    "Build/031f9f2ab73e5f3dea828b4f459bf54b.data.br",
    "Build/81d8cd8a12e7b868fe0ee2145986a026.wasm.br",
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
