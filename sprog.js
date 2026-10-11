/* Mit RTK: dansk og engelsk på medlemssiderne.
   Siden lægger sine tekster i window.TEKSTER = { da: {...}, en: {...} } før dette script.
   Elementer med data-t="nøgle" får teksten, data-t-ph pladsholderen og data-t-aria aria-label.
   Første gang vælges sproget efter telefonens sprog. Valget huskes på enheden.
   Ordlisten for faste udtryk står i Systemarkitektur/rtk-app/ORDLISTE_da_en.md. */
(function () {
  var NOEGLE = 'rtk.sprog';
  function hentGemt() { try { return localStorage.getItem(NOEGLE); } catch (e) { return null; } }
  function gem(v) { try { localStorage.setItem(NOEGLE, v); } catch (e) {} }
  function start() {
    var g = hentGemt();
    if (g === 'da' || g === 'en') return g;
    var l = String((navigator.languages && navigator.languages[0]) || navigator.language || 'da').toLowerCase();
    return (l.indexOf('da') === 0 || l.indexOf('nb') === 0 || l.indexOf('no') === 0 || l.indexOf('nn') === 0) ? 'da' : 'en';
  }
  var sprog = start();
  function t(k) {
    var T = window.TEKSTER || {};
    var v = (T[sprog] && T[sprog][k]);
    if (v === undefined) v = (T.da && T.da[k]);
    return v === undefined ? k : v;
  }
  function anvend() {
    document.documentElement.lang = sprog;
    var i, el, liste;
    liste = document.querySelectorAll('[data-t]');
    for (i = 0; i < liste.length; i++) { el = liste[i]; el.textContent = t(el.getAttribute('data-t')); }
    liste = document.querySelectorAll('[data-t-ph]');
    for (i = 0; i < liste.length; i++) { el = liste[i]; el.setAttribute('placeholder', t(el.getAttribute('data-t-ph'))); }
    liste = document.querySelectorAll('[data-t-aria]');
    for (i = 0; i < liste.length; i++) { el = liste[i]; el.setAttribute('aria-label', t(el.getAttribute('data-t-aria'))); }
    liste = document.querySelectorAll('.sprog button[data-sprog]');
    for (i = 0; i < liste.length; i++) { el = liste[i]; el.setAttribute('aria-pressed', String(el.getAttribute('data-sprog') === sprog)); }
    if (t('titel') !== 'titel') document.title = t('titel');
  }
  function saet(v) {
    if (v !== 'da' && v !== 'en') return;
    sprog = v; gem(v); anvend();
    document.dispatchEvent(new CustomEvent('sprog', { detail: v }));
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.sprog button[data-sprog]') : null;
    if (b) saet(b.getAttribute('data-sprog'));
  });
  window.RTK_SPROG = { t: t, saet: saet, anvend: anvend, get sprog() { return sprog; },
    lokal: function () { return sprog === 'en' ? 'en-GB' : 'da-DK'; } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', anvend); else anvend();
})();
