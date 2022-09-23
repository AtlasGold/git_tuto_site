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
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});