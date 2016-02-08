(function(){
  'use strict';

  if (!navigator.serviceWorker) {
    return;
  }

  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js')
      .then(function(r) {
        console.log('registered sw.js');
      })
      .catch(function(err) {
        console.error(err);
      });
  }, false);

  navigator.serviceWorker.ready.then(function(registration) {
    registration.pushManager.getSubscription().then(function(subscription) {
      var publicKey, secretKey, key, auth, options;

      // getKey() returns ArrayBuffer instance
      publicKey = subscription.getKey('p256dh');
      secretKey = subscription.getKey('auth');

      function base64(data) {
        var text = String.fromCharCode.apply(null, new Uint8Array(data));

        // replace index 62 and 63
        return btoa(text.replace(/\+/g, '-').replace(/\//g, '_'));
      }

      key = base64(publicKey);
      auth = base64(secretKey);

      options = {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          key: key,
          auth: auth
        })
      };

      fetch('//localhost:3000', options);
    });
  });
}());
