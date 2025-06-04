const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/14a62490b2f083870af6151aea087dd7.loader.js",
    "Build/85e813c480503c2a4bf5a7278c0fb304.framework.js.br",
    "Build/f581e50a3a61f8966030f257382bcf84.data.br",
    "Build/6333cf7b46746d52bec3203d12ab232c.wasm.br",
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
