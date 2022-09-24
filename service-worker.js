var cacheName = 'Git4Dum+-v1.2';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',

        './assets/css/bootstrap.min.css',

        './assets/js/bootstrap.min.js',

        './assets/js/jquery.min.js',

        './assets/js/popper.min.js',
        './assets/img/background.png',
        './assets/img/logo.png',
        './Assets.xcassets/AppIcon.appiconset/128.png',
        './Assets.xcassets/AppIcon.appiconset/144.png',
        './Assets.xcassets/AppIcon.appiconset/152.png',
        './Assets.xcassets/AppIcon.appiconset/167.png',
        './Assets.xcassets/AppIcon.appiconset/180.png',
        './Assets.xcassets/AppIcon.appiconset/196.png',
        './Assets.xcassets/AppIcon.appiconset/256.png',
        './Assets.xcassets/AppIcon.appiconset/512.png',
 //       './assets/img/formulas.JPG',
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./pwa-examples/js13kpwa/sw.js');
}


self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
     try {
       return await fetch(event.request);
     } catch (err) {
       return caches.match(event.request);
     }
   }());

  //Atualizacao cache
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );

});
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});