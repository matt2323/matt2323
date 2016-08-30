var CACHE_NAME = 'dependencies-cache';

// Files required to make this app work offline
var REQUIRED_FILES = [
  'content/heads.png',
  'content/spin.gif',
  'content/tails.png',
  'manifest.json',
  'website.css',
  'index.html',
  '/', // Separate URL than index.html!
  'website.js'
];


self.addEventListener('install', function(event) {
  // Perform install step:  loading each required file into cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Add all offline dependencies to the cache
        return cache.addAll(REQUIRED_FILES);
      })
      .then(function() {
      	// At this point everything has been cached
        return self.skipWaiting();
      })
  );
});

self.addEventListener('fetch', function(event) {
  
  if (event.request.mode === 'navigate' && (event.request.url == "http://localhost/" ||  event.request.url == "https://matt2323.github.io/" ))
  {
      return fetch(event.request).catch(function(error) {
        caches.match(event.request).then(function(response) {
          // Cache hit - return the response from the cached version
          if (response) {
            return response;
          }
        });
      }); 
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response from the cached version
        if (response) {
          return response;
        }
   
        fetch(event.request).then(function(response) {
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          });  
      });
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  // Calling claim() to force a "controllerchange" event on navigator.serviceWorker
  event.waitUntil(self.clients.claim());
});
