/* Mit RTK: fælles opsætning for alle sider (gennemgangen 14. oktober, trin 4).
   Adressen til motoren og Firebase står kun her. Ingen hemmeligheder: Firebase-nøglen er offentlig
   og beskyttes af reglerne i Firestore. Indlæses før konto.js og sidens eget script.
   Produktion vælges med ?miljoe=produktion, når der er en adresse til den. */
(function () {
  var MOTOR = {
    test: 'https://script.google.com/macros/s/AKfycbz_-LFD4pLRRxJjBI1kosmF3e0rKs8xPzZmgm4JLzl9oK6CQiMQrz-qPjxpvscDpn0r/exec',
    produktion: ''
  };
  var miljoe = new URLSearchParams(location.search).get('miljoe') === 'produktion' && MOTOR.produktion ? 'produktion' : 'test';
  window.RTK_KONFIG = Object.freeze({
    miljoe: miljoe,
    motor: MOTOR[miljoe],
    firebaseVersion: '12.19.0',
    firebase: Object.freeze({
      apiKey: 'AIzaSyDn-RtvKrm2g2D1HY7KLx6XXFXQDZZgcD4', authDomain: 'mitrtk-282fa.firebaseapp.com', projectId: 'mitrtk-282fa',
      storageBucket: 'mitrtk-282fa.firebasestorage.app', messagingSenderId: '1093255886930', appId: '1:1093255886930:web:0139ea144939078093078b'
    }),
    vapid: 'BHqx6aBwsxJg2-BMVlnkDteTMUWU268HoU_9xBRyOCR9JVKPqy3AojTskwDeTSisoCv7yYfdjsTu_y2aSxed_DM'
  });
})();
