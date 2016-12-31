'use strict';

console.log('Started', self);
self.addEventListener('install', function (event) {
    self.skipWaiting();
    console.log('Installed', event);
});
self.addEventListener('activate', function (event) {
    console.log('Activated', event);
});
self.addEventListener('push', function (event) {
    console.log('Push message received', event);
    var title = 'camera';
    event.waitUntil(
      self.registration.showNotification(title, {
          body: 'alert',
        //  icon: 'Content/runner.jpg',
          tag: 'my-tag'
      }));
});
self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn't close the notification when you click on it  
    // See: http://crbug.com/463146  
    event.notification.close();

    // This looks to see if the current is already open and  
    // focuses if it is  
    event.waitUntil(
      clients.matchAll({
          type: "window"
      })
      .then(function (clientList) {
          for (var i = 0; i < clientList.length; i++) {
              var client = clientList[i];
              if (client.url == '/' && 'focus' in client)
                  return client.focus();
          }
          if (clients.openWindow) {
              return clients.openWindow('/');
          }
      })
    );
})
