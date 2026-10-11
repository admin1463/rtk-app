/* Mit RTK: kort velkomst om data og beskeder.
   Besluttet af Lars 11. oktober 2026: vises første gang man logger ind eller slår beskeder til,
   og igen når teksten ændres væsentligt. Hæv VERSION, når det sker.
   Vises kun for den, der er logget ind (rtk.token findes). Valget huskes på enheden i rtk.velkomst.
   Siden kan kalde RTK_VELKOMST.tjek() lige efter login. */
(function () {
  var VERSION = '1';
  var NOEGLE = 'rtk.velkomst';
  var script = document.currentScript;
  var rod = script && script.src ? script.src.replace(/velkomst\.js(\?.*)?$/, '') : '/';

  var TEKST = {
    da: {
      kicker: 'Velkommen til Mit RTK', titel: 'Kort om dine data og beskeder',
      p1t: 'Kun det nødvendige', p1: 'Dit navn, dit mobilnummer og det, du bruger appen til, fx dine opstrengninger. Klubben giver det aldrig videre.',
      p2t: 'Beskeder om det, du er med i', p2: 'Fx at din ketsjer er klar, eller at en kamp er aflyst. Dem får du altid, men du vælger selv: notifikation, sms eller mail.',
      p3t: 'Nyt fra pro shoppen og partnerne', p3: 'Kun hvis du selv siger ja under Beskeder. Aldrig som sms.',
      ok: 'Forstået', laes: 'Læs hele teksten om privatliv', note: 'Du finder den altid under Privatliv nederst på siden.',
      tilbage: 'Tilbage', privatliv: 'Privatliv'
    },
    en: {
      kicker: 'Welcome to Mit RTK', titel: 'In short: your data and messages',
      p1t: 'Only what is needed', p1: 'Your name, your mobile number and what you use the app for, such as your racket stringing. The club never passes it on.',
      p2t: 'Messages about things you take part in', p2: 'For example that your racket is ready or that a match is cancelled. You always get these, but you choose how: notification, text message or email.',
      p3t: 'News from the pro shop and partners', p3: 'Only if you say yes under Messages. Never by text message.',
      ok: 'Got it', laes: 'Read the full privacy text', note: 'You can always find it under Privacy at the bottom of the page.',
      tilbage: 'Back', privatliv: 'Privacy'
    }
  };

  function hent(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function gem(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function sprog() { return (window.RTK_SPROG && window.RTK_SPROG.sprog === 'en') ? 'en' : 'da'; }

  var STIL = '.vk-bag{position:fixed;inset:0;z-index:1000;background:rgba(11,61,58,.55);display:flex;align-items:center;justify-content:center;padding:16px}' +
    '.vk{background:#FFFFFF;color:#000000;border-radius:8px;max-width:520px;width:100%;max-height:calc(100vh - 32px);overflow:auto;padding:28px 24px 22px;display:flex;flex-direction:column;gap:18px;box-shadow:0 10px 40px rgba(0,0,0,.25)}' +
    '.vk .kicker{margin:0}.vk h2{margin:0;font-size:28px;line-height:1.1;font-weight:800;letter-spacing:-.02em}' +
    '.vk ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:16px}' +
    '.vk li{display:flex;gap:14px;align-items:flex-start}.vk li svg{flex-shrink:0}' +
    '.vk li b{display:block;font-size:17px}.vk li span{font-size:15px;line-height:1.45}' +
    '.vk .vk-ok{width:100%;min-height:52px;font-size:16px}' +
    '.vk .vk-laes{align-self:center;font-size:15px;font-weight:500;text-underline-offset:3px;padding:8px 4px}' +
    '.vk .vk-note{margin:-8px 0 0;font-size:13px;color:#3A4652;text-align:center}' +
    '.vk-pl{position:fixed;inset:0;z-index:1001;background:rgba(11,61,58,.55);display:flex;align-items:center;justify-content:center;padding:16px}' +
    '.vk-pl .vk-ramme{background:#FFFFFF;border-radius:8px;width:100%;max-width:760px;height:calc(100vh - 32px);max-height:900px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.25)}' +
    '.vk-pl .vk-hoved{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px 10px 20px;background:#0B3D3A;color:#FFFFFF}' +
    '.vk-pl .vk-hoved b{font-size:18px}' +
    '.vk-pl .vk-tilbage{min-height:44px;border:1px solid #8FB8DE;background:transparent;color:#FFFFFF;border-radius:6px;padding:0 16px;font-weight:600}' +
    '.vk-pl iframe{flex-grow:1;width:100%;border:0}';

  var IKON = [
    '<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="#0F2537" stroke-width="1.5"><path d="M16 3 5 7v8c0 7 5 12 11 14 6-2 11-7 11-14V7Z"/><path d="m11 16 4 4 7-8"/></svg>',
    '<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="#0F2537" stroke-width="1.5"><path d="M8 22V14a8 8 0 0 1 16 0v8l2 3H6Z"/><path d="M13 28a3 3 0 0 0 6 0"/></svg>',
    '<svg width="32" height="32" viewBox="0 0 44 44" aria-hidden="true" fill="none" stroke="#0F2537" stroke-width="1.8"><path d="M6 20 V8 H18 L38 28 L28 38 Z"/><circle cx="13" cy="13" r="2.5"/></svg>'
  ];

  function el(tag, attr, tekst) {
    var e = document.createElement(tag);
    if (attr) Object.keys(attr).forEach(function (k) { e.setAttribute(k, attr[k]); });
    if (tekst !== undefined) e.textContent = tekst;
    return e;
  }

  function vis() {
    if (document.getElementById('vk-bag')) return;
    var T = TEKST[sprog()];
    if (!document.getElementById('vk-stil')) { var s = el('style', { id: 'vk-stil' }); s.textContent = STIL; document.head.appendChild(s); }
    var bag = el('div', { id: 'vk-bag', 'class': 'vk-bag' });
    var boks = el('div', { 'class': 'vk', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'vk-titel' });
    boks.appendChild(el('p', { 'class': 'kicker' }, T.kicker));
    boks.appendChild(el('h2', { id: 'vk-titel' }, T.titel));
    var ul = el('ul');
    [['p1t', 'p1'], ['p2t', 'p2'], ['p3t', 'p3']].forEach(function (p, i) {
      var li = el('li');
      li.innerHTML = IKON[i];
      var d = el('div');
      d.appendChild(el('b', null, T[p[0]]));
      d.appendChild(el('span', null, T[p[1]]));
      li.appendChild(d);
      ul.appendChild(li);
    });
    boks.appendChild(ul);
    var ok = el('button', { type: 'button', 'class': 'vk-ok' }, T.ok);
    ok.addEventListener('click', function () { gem(NOEGLE, VERSION); luk(); });
    boks.appendChild(ok);
    var laes = el('a', { 'class': 'vk-laes', href: rod + 'privatliv.html' }, T.laes);
    laes.addEventListener('click', function (e) { e.preventDefault(); visPrivatliv(T, laes); });
    boks.appendChild(laes);
    boks.appendChild(el('p', { 'class': 'vk-note' }, T.note));
    bag.appendChild(boks);
    document.body.appendChild(bag);
    document.documentElement.style.overflow = 'hidden';
    ok.focus();
    bag.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = boks.querySelectorAll('button, a[href]');
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
  }

  /** Privatlivsteksten i et vindue oven på velkomsten, så man bliver på siden. Ønsket af Lars 11. oktober kl. 13.01. */
  function visPrivatliv(T, tilbageTil) {
    if (document.getElementById('vk-pl')) return;
    var pl = el('div', { id: 'vk-pl', 'class': 'vk-pl' });
    var ramme = el('div', { 'class': 'vk-ramme', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'vk-pl-titel' });
    var hoved = el('div', { 'class': 'vk-hoved' });
    hoved.appendChild(el('b', { id: 'vk-pl-titel' }, T.privatliv));
    var tilbage = el('button', { type: 'button', 'class': 'vk-tilbage' }, T.tilbage);
    hoved.appendChild(tilbage);
    ramme.appendChild(hoved);
    ramme.appendChild(el('iframe', { src: rod + 'privatliv.html?indlejret=1', title: T.privatliv }));
    pl.appendChild(ramme);
    document.body.appendChild(pl);
    function lukPl() { if (pl.parentNode) pl.parentNode.removeChild(pl); if (tilbageTil) tilbageTil.focus(); }
    tilbage.addEventListener('click', lukPl);
    pl.addEventListener('click', function (e) { if (e.target === pl) lukPl(); });
    pl.addEventListener('keydown', function (e) { if (e.key === 'Escape') lukPl(); if (e.key === 'Tab') { e.preventDefault(); (document.activeElement === tilbage ? ramme.querySelector('iframe') : tilbage).focus(); } });
    tilbage.focus();
  }

  function luk() {
    var b = document.getElementById('vk-bag');
    if (b) b.parentNode.removeChild(b);
    document.documentElement.style.overflow = '';
  }

  /** Vis velkomsten, hvis man er logget ind og ikke har set den nyeste version. Ikke på selve privatlivssiden. */
  function tjek() {
    if (!hent('rtk.token')) return false;
    if (hent(NOEGLE) === VERSION) return false;
    if (/privatliv\.html$/.test(location.pathname)) return false;
    vis();
    return true;
  }

  window.RTK_VELKOMST = { tjek: tjek, vis: vis, luk: luk, VERSION: VERSION };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tjek); else tjek();
})();
