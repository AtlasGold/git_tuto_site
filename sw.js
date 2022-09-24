const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };
  
  
  registerServiceWorker();

  const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };
  
  self.addEventListener("install", (event) => {
    event.waitUntil(
      addResourcesToCache([
        "/",
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
      ])
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event
      .respondWith();
  });

  self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request));
  });
  
  const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
    return fetch(request);
  };
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
  });

  const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
  };
  
  const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  };
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
  });

  const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
  };
  
  const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
    // First try to get the resource from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  
    // Next try to get the resource from the network
    try {
      const responseFromNetwork = await fetch(request);
      // response may be used only once
      // we need to save clone to put one copy in cache
      // and serve second one
      putInCache(request, responseFromNetwork.clone());
      return responseFromNetwork;
    } catch (error) {
      const fallbackResponse = await caches.match(fallbackUrl);
      if (fallbackResponse) {
        return fallbackResponse;
      }
      // when even the fallback response is not available,
      // there is nothing we can do, but we must always
      // return a Response object
      return new Response("Network error happened", {
        status: 408,
        headers: { "Content-Type": "text/plain" },
      });
    }
  };
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      cacheFirst({
        request: event.request,
        fallbackUrl: "/gallery/myLittleVader.jpg",
      })
    );
  });

  
  const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  };
  
  self.addEventListener("activate", (event) => {
    event.waitUntil(enableNavigationPreload());
  });

  
  const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };
  
  const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
  };
  
  const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
    // First try to get the resource from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  
    // Next try to use (and cache) the preloaded response, if it's there
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
      console.info("using preload response", preloadResponse);
      putInCache(request, preloadResponse.clone());
      return preloadResponse;
    }
  
    // Next try to get the resource from the network
    try {
      const responseFromNetwork = await fetch(request);
      // response may be used only once
      // we need to save clone to put one copy in cache
      // and serve second one
      putInCache(request, responseFromNetwork.clone());
      return responseFromNetwork;
    } catch (error) {
      const fallbackResponse = await caches.match(fallbackUrl);
      if (fallbackResponse) {
        return fallbackResponse;
      }
      // when even the fallback response is not available,
      // there is nothing we can do, but we must always
      // return a Response object
      return new Response("Network error happened", {
        status: 408,
        headers: { "Content-Type": "text/plain" },
      });
    }
  };
  
  // Enable navigation preload
  const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  };
  
  self.addEventListener("activate", (event) => {
    event.waitUntil(enableNavigationPreload());
  });
  
  self.addEventListener("install", (event) => {
    event.waitUntil(
      addResourcesToCache([
        "/",
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
      ])
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      cacheFirst({
        request: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallbackUrl:'./Assets.xcassets/AppIcon.appiconset/128.png',
      })
    );
  });
  