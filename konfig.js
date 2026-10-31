/* Mit RTK: fælles opsætning for alle sider (gennemgangen 14. oktober, trin 4).
   Adressen til motoren og Firebase står kun her. Ingen hemmeligheder: Firebase-nøglen er offentlig
   og beskyttes af reglerne i Firestore. Indlæses før konto.js og sidens eget script.
   Miljøet vælges efter adressen (31. oktober 2026): mitrtk.dk er produktion, alt andet (test.mitrtk.dk
   og lokale test) er test. Produktionsmotoren "RTK motor" ejes af drift@ (udrullet 31. oktober kl. 23.45). */
(function () {
  var MILJOER = {
    test: {
      motor: 'https://script.google.com/macros/s/AKfycbz_-LFD4pLRRxJjBI1kosmF3e0rKs8xPzZmgm4JLzl9oK6CQiMQrz-qPjxpvscDpn0r/exec',
      firebase: {
        apiKey: 'AIzaSyDn-RtvKrm2g2D1HY7KLx6XXFXQDZZgcD4', authDomain: 'mitrtk-282fa.firebaseapp.com', projectId: 'mitrtk-282fa',
        storageBucket: 'mitrtk-282fa.firebasestorage.app', messagingSenderId: '1093255886930', appId: '1:1093255886930:web:0139ea144939078093078b'
      },
      vapid: 'BHqx6aBwsxJg2-BMVlnkDteTMUWU268HoU_9xBRyOCR9JVKPqy3AojTskwDeTSisoCv7yYfdjsTu_y2aSxed_DM'
    },
    produktion: {
      motor: 'https://script.google.com/macros/s/AKfycbwCYeGgyKMjaLJMzpfv4GjePzRf-i1H3Mt6VmjG0EdP9P4xTXcCgezfziasy3gXCnf2Ow/exec',
      firebase: {
        apiKey: 'AIzaSyBJVywXgGl_0HzWR3B7rWbdnJXy2zBEvJk', authDomain: 'mit-rtk.firebaseapp.com', projectId: 'mit-rtk',
        storageBucket: 'mit-rtk.firebasestorage.app', messagingSenderId: '2375479119', appId: '1:2375479119:web:7d02fabbb85dab278f1f3a'
      },
      vapid: 'BBikwBL7KsoEE0gN35iQVqzvYpdCUka7S6v228I5NrH5U3j0pZ-8rFWEZiPa6k2vOEdcmW-myCXJ16kf-y2o2vc'
    }
  };
  var vaert = String(location.hostname || '').toLowerCase().replace(/\.$/, '');
  var miljoe = (vaert === 'mitrtk.dk' || vaert === 'www.mitrtk.dk') && MILJOER.produktion.motor ? 'produktion' : 'test';
  var m = MILJOER[miljoe];
  // Det, der ikke er gået live i produktionen (Lars 31. oktober 2026): siderne skjules fra forsiderne, og et direkte
  // link sender til forsiden. I testen vises alt som før.
  var SKJULT = miljoe === 'produktion'
    ? ['grupper.html', 'privattraening.html', 'beskeder.html', 'boern.html', 'privattimer.html', 'ace.html']
    : [];
  window.RTK_KONFIG = Object.freeze({
    miljoe: miljoe,
    motor: m.motor,
    firebaseVersion: '12.19.0',
    firebase: Object.freeze(m.firebase),
    vapid: m.vapid,
    skjult: Object.freeze(SKJULT.slice())
  });
  // Har browseren sidst brugt et andet miljø på samme adresse (mitrtk.dk var testens adresse til 31. oktober),
  // glemmes login og den huskede person, så intet fra testen vises eller sendes til produktionen
  try {
    var foer = localStorage.getItem('rtk.miljoe');
    if (foer && foer !== miljoe) {
      Object.keys(localStorage).forEach(function (k) { if (/^rtk\./.test(k) && k !== 'rtk.sprog' && k !== 'rtk.enhed') localStorage.removeItem(k); });
      try { Object.keys(sessionStorage).forEach(function (k) { if (/^rtk\./.test(k)) sessionStorage.removeItem(k); }); } catch (e) {}
    }
    localStorage.setItem('rtk.miljoe', miljoe);
  } catch (e) {}
  if (miljoe !== 'produktion') return;
  var side = decodeURIComponent(String(location.pathname.split('/').pop() || 'index.html')).toLowerCase();
  if (!/\.html$/.test(side)) side += '.html';
  if (SKJULT.indexOf(side) >= 0) { location.replace(/\/personale\//.test(location.pathname) ? './' : '/'); return; }
  try {
    var st = document.createElement('style');
    st.textContent = SKJULT.map(function (s) { return 'a[href*="' + s + '"]'; }).join(',') + '{display:none !important}';
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}
  function ryd() {
    // Links til sider, der ikke er live (fx felterne på medlemssiden), og mærket "Testversion" i bunden
    Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
      var h = String(a.getAttribute('href') || '').split('#')[0].split('?')[0].split('/').pop();
      if (SKJULT.indexOf(h) >= 0) a.style.display = 'none';
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-t="test"], .bund span'), function (e) {
      if (e.matches('[data-t="test"]') || (!e.children.length && /^Testversion\./.test(String(e.textContent || '').trim()))) e.style.display = 'none';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ryd); else ryd();
})();
