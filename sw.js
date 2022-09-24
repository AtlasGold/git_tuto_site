    const cacheName = "cache1"; // Change value to force update

    self.addEventListener("install", event => {
        // Kick out the old service worker
        self.skipWaiting();
    
        event.waitUntil(
            caches.open(cacheName).then(cache => {
                return cache.addAll([
                    "/",
                    '/index.html',
                    '/assets/css/bootstrap.min.css',
                    '/assets/js/bootstrap.min.js',
                    '/assets/js/jquery.min.js',
                    '/assets/js/popper.min.js',
                    '/assets/img/background.png',
                    '/assets/img/logo.png',
                    '/images/icons/Assets.xcassets/AppIcon.appiconset/128.png',
                    '/images/icons/Assets.xcassets/AppIcon.appiconset/144.png',
                    '/images/icons/Assets.xcassets/AppIcon.appiconset/152.png',
                    '/images/icons/Assets.xcassets/AppIcon.appiconset/167.png',
                    '/images/icons/Assets.xcassets/AppIcon.appiconset/180.png',
                    '/images/icons/Assets.xcassets/AppIcon.appiconset/196.png',
                    '/images/icons/Assets.xcassets/AppIcon.appiconset/256.png',
                    '/images/icons/Assets.xcassets/AppIcon.appiconset/512.png',
                  ]);
            })
        );
    });
    
    self.addEventListener("activate", event => {
        // Delete any non-current cache
        event.waitUntil(
            caches.keys().then(keys => {
                Promise.all(
                    keys.map(key => {
                        if (![cacheName].includes(key)) {
                            return caches.delete(key);
                        }
                    })
                )
            })
        );
    });
    
    self.addEventListener("fetch", event => {
        event.respondWith(
            caches.open(cacheName).then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
            })
        );
    });