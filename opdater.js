/* Mit RTK: hold siden opdateret (Lars 16. oktober 2026 kl. 11.32, rettet efter gennemgangen samme dag).
   Et ikon på hjemmeskærmen kan blive ved med at vise en gammel udgave, fordi telefonen holder siden åben i baggrunden,
   og GitHub må gemme den i 10 minutter. Hver side har et versionsmærke (<meta name="rtk-version">), og vaerktoej/stempel.py
   skriver alle sidernes mærker i /version.json. Når siden åbnes, eller man vender tilbage til den, hentes version.json
   (lille, uden for cachen). Er der en ny udgave, hentes siden igen med det samme, hvis man ikke er i gang med noget.
   Ellers vises en lille bjælke med "Opdater". */
(function () {
  var meta = document.querySelector('meta[name="rtk-version"]');
  if (!meta || !window.fetch) return;
  var min = meta.getAttribute('content'), sidst = 0, bjaelke = null, status = null;
  // Sidens navn i version.json: "/" er index.html, "/personale/" er personale/index.html
  var navn = location.pathname.replace(/^\//, '');
  if (navn === '' || /\/$/.test(navn)) navn += 'index.html';
  var EN = function () { try { return (localStorage.getItem('rtk.sprog') || document.documentElement.lang) === 'en'; } catch (e) { return false; } };
  // Rulningen efter en opdatering, så siden ikke springer
  try {
    var r = JSON.parse(sessionStorage.getItem('rtk.rul') || 'null');
    if (r && r.side === location.pathname + location.search + location.hash) addEventListener('load', function () { scrollTo(0, r.y); });
    sessionStorage.removeItem('rtk.rul');
  } catch (e) { /* privat tilstand */ }
  // Statusfeltet findes fra start, så skærmlæsere læser beskeden op, når den kommer
  function lavStatus() {
    if (status || !document.body) return;
    status = document.createElement('div');
    status.className = 'rtk-ny-status';
    status.setAttribute('role', 'status');
    document.body.appendChild(status);
  }
  if (document.body) lavStatus(); else document.addEventListener('DOMContentLoaded', lavStatus);
  /** Er man i gang med noget? Et felt med fokus, et felt, der er ændret, et login (telefon, kode, pinkode) eller siden siger det selv. */
  function travl() {
    var a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return true;
    var felter = document.querySelectorAll('input, textarea, select');
    for (var i = 0; i < felter.length; i++) {
      var f = felter[i];
      if (f.offsetParent === null || f.type === 'hidden') continue;
      if (f.type === 'tel' || f.type === 'password' || f.autocomplete === 'one-time-code') return true;
      if (f.type === 'checkbox' || f.type === 'radio') { if (f.checked !== f.defaultChecked) return true; continue; }
      if (f.tagName === 'SELECT') { for (var j = 0; j < f.options.length; j++) if (f.options[j].selected !== f.options[j].defaultSelected) return true; continue; }
      if (f.value !== f.defaultValue) return true;
    }
    try { return !!window.RTK_TRAVL || !!window.RTK_ACE; } catch (e) { return true; }
  }
  function hent(ny) {
    try {
      sessionStorage.setItem('rtk.opdateret', ny + '|' + Date.now());
      sessionStorage.setItem('rtk.rul', JSON.stringify({ side: location.pathname + location.search + location.hash, y: scrollY }));
    } catch (e) { /* privat tilstand */ }
    // Hent siden forbi cachen, så den gemte kopi også bliver ny (også den, ikonet på hjemmeskærmen åbner), og indlæs så igen
    fetch(location.pathname + location.search, { cache: 'reload' }).catch(function () {}).then(function () { location.reload(); });
  }
  function lige(ny) {
    // Er siden lige hentet for den samme version, men står stadig gammel, så vis bjælken i stedet for at hente igen og igen
    try { var s = (sessionStorage.getItem('rtk.opdateret') || '').split('|'); return s[0] === ny && Date.now() - Number(s[1]) < 120000; } catch (e) { return false; }
  }
  function visBjaelke(ny) {
    lavStatus();
    if (bjaelke) return;
    bjaelke = document.createElement('div');
    bjaelke.className = 'rtk-ny';
    var t = document.createElement('span');
    t.textContent = EN() ? 'A new version of Mit RTK is ready.' : 'Der er en ny version af Mit RTK.';
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = EN() ? 'Update' : 'Opdater';
    b.addEventListener('click', function () { hent(ny); });
    var x = document.createElement('button');
    x.type = 'button'; x.className = 'luk';
    x.setAttribute('aria-label', EN() ? 'Close' : 'Luk');
    x.textContent = '×';
    x.addEventListener('click', function () { bjaelke.hidden = true; });
    bjaelke.appendChild(t); bjaelke.appendChild(b); bjaelke.appendChild(x);
    document.body.appendChild(bjaelke);
    if (status) status.textContent = t.textContent;
  }
  function tjek(tving) {
    if (!tving && Date.now() - sidst < 60000) return;
    sidst = Date.now();
    fetch('/version.json?tjek=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (v) {
        var ny = v && v[navn];
        if (!ny || ny === min) return;
        if (bjaelke && !bjaelke.hidden) return;
        if (!travl() && document.visibilityState !== 'hidden' && !lige(ny)) hent(ny);
        else visBjaelke(ny);
      })
      .catch(function () { /* offline: prøv næste gang */ });
  }
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') tjek(); });
  window.addEventListener('pageshow', function (e) { if (e.persisted) tjek(true); });
  window.addEventListener('focus', function () { tjek(); });
  setTimeout(function () { tjek(true); }, 400);
  setInterval(function () { if (document.visibilityState === 'visible') tjek(true); }, 30 * 60000);
  window.RTK_OPDATER = { tjek: function () { tjek(true); }, travl: travl };
})();
