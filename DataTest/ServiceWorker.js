const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/2c32b5992fad886f40aee927f20d514d.loader.js",
    "Build/f40ed287c34aef3a9106838db0922498.framework.js.br",
    "Build/8f88708aa19af14b75a3bc4642a57c42.data.br",
    "Build/7e13b458fc75c47485c068acc848591c.wasm.br",
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
