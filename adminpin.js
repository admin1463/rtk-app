/* Mit RTK: pinkode til Administration (Lars 1. november 2026, mockup admin_pinkode.png).
   Første gang laver administratoren en pinkode på 6 cifre. Derefter tastes den, når Administration åbnes, og gælder
   12 timer på denne enhed. Motoren tjekker beviset ved hver handling, der kun er for administratorer (kerne/adminpin.gs).
   Siderne sender RTK_APIN.bevis() med i hvert kald og kalder RTK_APIN.spoerg(motor), når motoren svarer apin.
   Sider, der kun er for administratorer, kalder RTK_APIN.sikr(motor), før de viser noget fra Firebase.
   Beviset huskes på enheden sammen med de sidste 16 tegn af login, så det kun gælder for det login. */
(function () {
  'use strict';
  var NOEGLE = 'rtk.apin';
  function tok() { try { return localStorage.getItem('rtk.token') || ''; } catch (e) { return ''; } }
  function laes() { try { return JSON.parse(localStorage.getItem(NOEGLE) || 'null'); } catch (e) { return null; } }
  function gem(o) { try { if (o) localStorage.setItem(NOEGLE, JSON.stringify(o)); else localStorage.removeItem(NOEGLE); } catch (e) {} }
  function bevis() {
    var o = laes(), t = tok();
    if (!o || !t || o.t !== t.slice(-16) || !(Number(o.til) > Date.now() + 30000)) return '';
    return String(o.b || '');
  }
  // Udløbet regnes på telefonens eget ur ud fra motorens svar, så et forkert ur ikke giver nye spørgsmål hele tiden (gennemgangen 1. november)
  function husk(r) { var til = Date.now() + (Number(r.til) - Number(r.nu || r.til - 12 * 3600000)); gem({ b: r.bevis, til: til, t: tok().slice(-16) }); }
  function prod() { return !!(window.RTK_KONFIG && window.RTK_KONFIG.miljoe === 'produktion'); }
  // Sider kun for administratorer (Personer og roller, Drift): Tilbage går til personalesiden. På sider med andet arbejde lukkes skærmen bare
  function kunAdmin() { return best() || /\/(personer|drift)\.html$/.test(location.pathname); }
  // Bestyrelsens visning (Lars 1. november 2026): siden sætter RTK_APIN_BEST, så teksterne passer, og Tilbage går til personalesiden
  function best() { return !!window.RTK_APIN_BEST; }
  function omr() { return best() ? 'Bestyrelsens sider' : 'Administration'; }
  // Andre dele af siden kan vente på, at pinkoden er tastet (fx administratorens kopier i Arbejdstøj og Privattimer)
  function tastet() { try { window.dispatchEvent(new Event('rtk-apin')); } catch (e) {} }
  // I produktion kræves pinkoden altid. I testen kun, hvis motoren har sagt det (indstillingen admin.pinkode = ja),
  // så testens sider ikke laver et ekstra kald for at spørge
  function kraevMaerk(k) { try { if (k) localStorage.setItem('rtk.apin.kraevet', tok().slice(-16)); else localStorage.removeItem('rtk.apin.kraevet'); } catch (e) {} }
  function fri() {
    var k = ''; try { k = localStorage.getItem('rtk.apin.kraevet') || ''; } catch (e) {}
    return !prod() && !(k && k === tok().slice(-16));
  }
  /** Må siden vise administratorens data fra Firebase nu? */
  function aaben_() { return fri() || !!bevis(); }

  var CSS = '.ap-bag{position:fixed;inset:0;z-index:9000;background:#fff;overflow:auto;-webkit-overflow-scrolling:touch}' +
    '.ap-ind{max-width:420px;margin:0 auto;padding:28px 20px 40px}' +
    '.ap-ind h2{margin:4px 0 8px;outline:none}body.ap-aaben{overflow:hidden}.ap-ind .hint{margin:0 0 14px}' +
    '.ap-felter{display:flex;gap:8px;margin:6px 0 4px}.ap-felt{flex:1;height:50px;border:1.5px solid #c9d2d0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:26px;color:#0F2537}' +
    '.ap-felt.fyldt{border-color:#0B3D3A}.ap-felter.fejl .ap-felt{border-color:#E6005C;background:#FDECF3}.ap-felter.aktiv .ap-felt:not(.fyldt){border-color:#8FB8DE}' +
    '.ap-tast{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}' +
    '.ap-tast button{height:52px;font-size:22px;background:#fff;color:#0F2537;border:1.5px solid #c9d2d0;border-radius:12px;min-height:0;padding:0;font-weight:600}' +
    '.ap-tast button:active{background:#eef3f2}.ap-tast .tom{visibility:hidden}.ap-tast button:disabled{opacity:.4}' +
    '.ap-linje{display:flex;justify-content:space-between;gap:10px;margin-top:12px}' +
    '.ap-laas{border:1.5px solid #E6005C;border-radius:12px;padding:14px 16px;margin-top:14px}.ap-laas h3{margin:0 0 6px}.ap-laas button{margin-top:10px}' +
    '.ap-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}';

  var aaben = null;
  function el(tag, cls, tekst) { var e = document.createElement(tag); if (cls) e.className = cls; if (tekst !== undefined) e.textContent = tekst; return e; }

  function vis(motor, s) {
    if (aaben) return aaben;
    aaben = new Promise(function (ok, nej) {
      if (!document.getElementById('apCss')) { var st = el('style'); st.id = 'apCss'; st.textContent = CSS; document.head.appendChild(st); }
      var lav = !s.har;
      var bag = el('div', 'ap-bag'); bag.setAttribute('role', 'dialog'); bag.setAttribute('aria-modal', 'true'); bag.setAttribute('aria-labelledby', 'apTitel');
      var ind = el('div', 'ap-ind'); bag.appendChild(ind);
      ind.appendChild(el('p', 'kicker', best() ? 'Bestyrelsen' : 'Administration'));
      var h = el('h2', '', lav ? 'Lav din pinkode' : 'Tast din pinkode'); h.id = 'apTitel'; h.tabIndex = -1; ind.appendChild(h);
      ind.appendChild(el('p', 'hint', lav
        ? omr() + ' beskyttes af en pinkode med 6 cifre, som kun du kender. Den skal tastes, når du åbner ' + (best() ? 'dem' : 'Administration') + ', og gælder derefter i 12 timer på denne enhed.'
        : 'Pinkoden gælder i 12 timer på denne enhed.' + (best() ? '' : ' Dit eget arbejde (fx opstrengning) kræver ingen pinkode.')));
      var raekker = [], vaerdier = ['', ''], aktiv = 0;
      function raekke(label) {
        if (label) ind.appendChild(el('p', '', label)).style.cssText = 'margin:10px 0 0;font-weight:600;font-size:15px';
        var r = el('div', 'ap-felter'); r.setAttribute('aria-hidden', 'true');
        for (var i = 0; i < 6; i++) r.appendChild(el('span', 'ap-felt'));
        ind.appendChild(r); raekker.push(r);
      }
      raekke(lav ? 'Vælg 6 cifre' : ''); if (lav) raekke('Gentag dem');
      var status = el('p', 'ap-sr'); status.setAttribute('aria-live', 'polite'); ind.appendChild(status);
      var msg = el('p', 'msg'); msg.setAttribute('role', 'alert'); msg.style.margin = '8px 0 0'; ind.appendChild(msg);
      var tast = el('div', 'ap-tast'); ind.appendChild(tast);
      var knapper = [];
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].forEach(function (t) {
        if (!t) { var tom = el('span', 'tom'); tom.setAttribute('aria-hidden', 'true'); tast.appendChild(tom); return; }
        var b = el('button', '', t); b.type = 'button';
        if (t === '⌫') b.setAttribute('aria-label', 'Slet');
        b.addEventListener('click', function () { if (t === '⌫') slet(); else tryk(t); });
        tast.appendChild(b); knapper.push(b);
      });
      var linje = el('div', 'ap-linje'); ind.appendChild(linje);
      var tilbage = el('button', 'ghost small', 'Tilbage'); tilbage.type = 'button'; linje.appendChild(tilbage);
      var glemt = el('button', 'ghost small', 'Glemt pinkoden?'); glemt.type = 'button'; if (!lav) linje.appendChild(glemt);
      var laasBoks = el('div', 'ap-laas'); laasBoks.hidden = true; laasBoks.setAttribute('role', 'alert'); ind.appendChild(laasBoks);
      if (lav) ind.appendChild(el('p', 'hint', 'Undgå 123456, din fødselsdag og dit telefonnummer.')).style.marginTop = '12px';
      // Resten af siden kan ikke nås med tastaturet eller skærmlæseren, mens skærmen er åben
      var inerte = Array.prototype.filter.call(document.body.children, function (x) { return !x.inert && x.tagName !== 'SCRIPT'; });
      inerte.forEach(function (x) { x.inert = true; });
      document.body.appendChild(bag); document.body.classList.add('ap-aaben');
      var travl = false;

      function tegn() {
        raekker.forEach(function (r, i) {
          var v = vaerdier[i];
          r.classList.toggle('aktiv', i === aktiv && !travl);
          Array.prototype.forEach.call(r.children, function (f, j) { f.classList.toggle('fyldt', j < v.length); f.textContent = j < v.length ? '•' : ''; });
        });
        status.textContent = (lav ? (aktiv === 0 ? 'Vælg 6 cifre. ' : 'Gentag dem. ') : '') + vaerdier[aktiv].length + ' af 6 cifre';
        knapper.forEach(function (b) { b.disabled = travl || !laasBoks.hidden; });
      }
      function fejlVis(t) {
        msg.textContent = t; msg.className = 'msg err';
        raekker[aktiv].classList.add('fejl'); setTimeout(function () { raekker.forEach(function (r) { r.classList.remove('fejl'); }); }, 900);
      }
      function laast(t, helt) {
        laasBoks.innerHTML = '';
        laasBoks.appendChild(el('h3', '', omr() + (helt ? ' er spærret' : ' er låst')));
        laasBoks.appendChild(el('p', '', t)).style.margin = '0 0 6px';
        laasBoks.appendChild(el('p', 'hint', 'Klubbens administratorer har fået en mail. ' + (helt ? 'En ' + (best() ? '' : 'anden ') + 'administrator kan nulstille din pinkode under Personer og roller.' : 'Kender du ikke pinkoden, så bed en ' + (best() ? '' : 'anden ') + 'administrator nulstille den under Personer og roller.'))).style.margin = '0';
        if (!helt) { var igen = el('button', 'ghost small', 'Prøv igen'); igen.type = 'button'; igen.addEventListener('click', function () { location.reload(); }); laasBoks.appendChild(igen); }
        laasBoks.hidden = false; msg.textContent = ''; tegn();
      }
      function luk() { document.removeEventListener('keydown', tast_); document.removeEventListener('paste', saet_); bag.remove(); document.body.classList.remove('ap-aaben'); inerte.forEach(function (x) { x.inert = false; }); }
      function tryk(c) {
        if (travl || !laasBoks.hidden) return;
        msg.textContent = ''; msg.className = 'msg';
        if (vaerdier[aktiv].length >= 6) return;
        vaerdier[aktiv] += c; tegn();
        if (vaerdier[aktiv].length === 6) {
          if (lav && aktiv === 0) { aktiv = 1; tegn(); return; }
          send();
        }
      }
      function slet() {
        if (travl) return;
        if (lav && aktiv === 1 && !vaerdier[1]) { aktiv = 0; }
        vaerdier[aktiv] = vaerdier[aktiv].slice(0, -1); tegn();
      }
      function send() {
        travl = true; tegn(); msg.textContent = 'Tjekker …'; msg.className = 'msg';
        var p = lav ? motor('kerne', 'apinLav', { pin: vaerdier[0], pin2: vaerdier[1] }) : motor('kerne', 'apinTjek', { pin: vaerdier[0] });
        p.then(function (r) { husk(r); luk(); ok(true); tastet(); }).catch(function (e) {
          travl = false;
          var t = String((e && e.message) || 'Noget gik galt');
          if (/spærret/.test(t)) { vaerdier = ['', '']; aktiv = 0; laast('Der er tastet forkert for mange gange.', true); return; }
          if (/låst/.test(t)) { vaerdier = ['', '']; aktiv = 0; laast(t.replace(/^Administration er låst efter /, 'Der er tastet forkert ').replace(/forsøg\. /, 'gange. ')); return; }
          // Svaret på "Lav" gik tabt, men pinkoden blev gemt: skift til "Tast" (gennemgangen 1. november)
          if (lav && /allerede en pinkode/.test(t)) { location.reload(); return; }
          // Pinkoden laves kun lige efter et login med sms-kode
          if (/Log ind igen med en sms-kode/.test(t)) { frisk(t); return; }
          fejlVis(t);
          if (lav) { vaerdier = ['', '']; aktiv = 0; } else vaerdier[0] = '';
          tegn();
        });
      }
      function frisk(t) {
        laasBoks.innerHTML = '';
        laasBoks.appendChild(el('h3', '', 'Log ind igen'));
        laasBoks.appendChild(el('p', '', t)).style.margin = '0 0 6px';
        var ind2 = el('button', '', 'Log ind igen'); ind2.type = 'button';
        ind2.addEventListener('click', function () {
          if (typeof window.logUd === 'function') { window.logUd(false); return; }
          try { localStorage.removeItem('rtk.token'); } catch (e) {} location.reload();
        });
        laasBoks.appendChild(ind2); laasBoks.hidden = false; msg.textContent = ''; vaerdier = ['', '']; aktiv = 0; tegn();
      }
      function saet_(e) {
        var t = ((e.clipboardData || window.clipboardData).getData('text') || '').replace(/\D/g, '').slice(0, 6);
        if (!t) return; e.preventDefault(); vaerdier[aktiv] = ''; t.split('').forEach(tryk);
      }
      document.addEventListener('paste', saet_);
      function tast_(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key >= '0' && e.key <= '9' && e.key.length === 1) { e.preventDefault(); tryk(e.key); }
        else if (e.key === 'Backspace') { e.preventDefault(); slet(); }
      }
      document.addEventListener('keydown', tast_);
      tilbage.addEventListener('click', function () {
        luk(); nej(Object.assign(new Error('Pinkoden blev ikke tastet'), { apinAfbrudt: true }));
        if (!kunAdmin()) { if (location.hash) location.hash = ''; return; }
        var i = location.pathname.indexOf('/personale/');
        location.href = i >= 0 ? location.pathname.slice(0, i) + '/personale/' : './';
      });
      glemt.addEventListener('click', function () {
        msg.className = 'msg'; msg.textContent = 'Bed en ' + (best() ? '' : 'anden ') + 'administrator nulstille din pinkode under Personer og roller. Så laver du en ny, næste gang du åbner ' + (best() ? 'bestyrelsens sider' : 'Administration') + '.';
      });
      if (s.spaerret) laast('Der er tastet forkert for mange gange.', true);
      else if (s.laastTil) laast('Der er tastet forkert for mange gange. Prøv igen kl. ' + s.laastTil + '.');
      tegn();
      try { h.focus(); } catch (e) {}
    }).finally(function () { aaben = null; });
    return aaben;
  }

  /** Sørg for et gyldigt bevis, før en side kun for administratorer viser noget. Uden krav sker intet. */
  function sikr(motor) {
    if (fri()) return Promise.resolve(true);
    if (bevis()) {
      // Beviset huskes på enheden. Motoren spørges i baggrunden, om det stadig gælder (fx efter en nulstilling),
      // så siden ikke viser administratorens kopier fra Firebase på et bevis, der er trukket tilbage (gennemgangen 1. november 2026)
      motor('kerne', 'apinStatus').then(function (s) { if (s && s.kraevet && !s.gyldig) { gem(null); location.reload(); } }).catch(function () {});
      return Promise.resolve(true);
    }
    return motor('kerne', 'apinStatus').then(function (s) {
      kraevMaerk(!!(s && s.kraevet));
      tjekProd(s);
      if (!s || !s.kraevet || s.gyldig) return true;
      return vis(motor, s);
    });
  }
  // På mitrtk.dk skal motoren altid kræve pinkoden. Gør den ikke, er motoren ikke sat op som produktion (MILJOE), og siden stopper
  function tjekProd(s) {
    if (prod() && s && !s.kraevet) throw new Error('Pinkoden til Administration er ikke slået til i motoren. Kontakt klubbens systemansvarlige.');
  }
  /** Motoren svarede apin: beviset mangler eller er udløbet. Spørg efter pinkoden. */
  var spurgt = [];
  function spoerg(motor) {
    var nu = Date.now(); spurgt = spurgt.filter(function (t) { return nu - t < 15000; }); spurgt.push(nu);
    if (spurgt.length > 3) return Promise.reject(new Error('Pinkoden kunne ikke bekræftes. Genindlæs siden.'));
    gem(null);
    return motor('kerne', 'apinStatus').then(function (s) { kraevMaerk(!!(s && s.kraevet)); tjekProd(s); return s && s.kraevet ? vis(motor, s).then(function (x) { return x; }) : true; });
  }
  window.RTK_APIN = { bevis: bevis, sikr: sikr, spoerg: spoerg, aaben: aaben_, glem: function () { gem(null); } };
})();
