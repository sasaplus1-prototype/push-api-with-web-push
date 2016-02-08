'use strict';

self.addEventListener('push', function(event) {
  var data;

  if (!event.data) {
    return;
  }

  data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(
      data.title, {
        icon: '',
        body: data.body,
        tag: data.tag
      }
    )
  );
}, false);
