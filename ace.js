/* Mit RTK: Ace, klubbens AI-hjælper (testudgaven, Lars 25. oktober 2026).
   Knappen "Spørg Ace" nederst til højre på medlemssiderne, kun for den, der er logget ind, og kun når motoren siger, at Ace er til.
   Samtalen findes kun, mens siden er åben (ingen hukommelse fra gang til gang). Motoren gemmer den uden navn.
   Bruger rtk.css (.ace-*) og konfig.js. Hentes den ikke af siden, henter ace.js selv konfig.js. */
(function () {
  'use strict';
  if (window.RTK_ACE_START) return;
  window.RTK_ACE_START = true;
  if (/[?&]indlejret=1/.test(location.search)) return;

  var T = {
    da: {
      knap: 'Spørg Ace', titel: 'Ace', under: 'Klubbens AI-hjælper', test: 'TEST', luk: 'Luk Ace', ny: 'Ny samtale', nyAria: 'Start en ny samtale med Ace',
      ai: 'Ace er en AI og kan tage fejl. Den svarer ud fra siderne i Mit RTK, klubbens hjemmeside og infoskærmen. Skriv ikke personlige oplysninger.',
      hej: 'Hej {navn}. Jeg er Ace, klubbens AI-hjælper.', hej2: 'Spørg mig om Mit RTK, om klubben, eller hvis noget ikke virker. Jeg kan ikke se dine grupper eller dine data endnu.',
      f1: 'Hvordan melder jeg mig til et spil?', f2: 'Hvad sker der i klubben?', f3: 'Hvordan får jeg strenget min ketsjer?', f4: 'Noget virker ikke',
      ph: 'Skriv til Ace', send: 'Send', skriver: 'Ace skriver …', kilde: 'Kilde', kilder: 'Kilder',
      loft: 'Testudgave. Du har {n} spørgsmål tilbage i dag.', loft0: 'Testudgave. Du har ikke flere spørgsmål i dag.',
      sendH: 'Send spørgsmålet til klubben', sendT: 'Går til kontakt@roskildetennisklub.dk med dit navn og din mail, så de kan svare dig. Samtalen med Ace sendes med.',
      mail: 'Din mail', sendKnap: 'Send', nejTak: 'Nej tak', sender: 'Sender …', sendt: 'Sendt til klubben. De svarer dig på mail.',
      fejl: 'Noget gik galt. Prøv igen.',
      pers: 'PERSONALE',
      aiP: 'Ace er en AI og kan tage fejl. Den svarer ud fra siderne i Mit RTK og personalesiderne, klubbens hjemmeside og infoskærmen. Den kan ikke se data og kender ingen koder.',
      hej2P: 'Spørg mig om personalesiderne eller om klubben. Jeg kan ikke se data og kender ingen koder.',
      sendHP: 'Send spørgsmålet til administratorerne', sendTP: 'Går til klubbens administratorer med dit navn og din mail, så de kan svare dig. Samtalen med Ace sendes med.',
      sendtP: 'Sendt til administratorerne. De svarer dig på mail.'
    },
    en: {
      knap: 'Ask Ace', titel: 'Ace', under: 'The club\'s AI helper', test: 'TEST', luk: 'Close Ace', ny: 'New chat', nyAria: 'Start a new chat with Ace',
      ai: 'Ace is an AI and can make mistakes. It answers from the pages in Mit RTK, the club website and the info screen. Do not write personal information.',
      hej: 'Hi {navn}. I am Ace, the club\'s AI helper.', hej2: 'Ask me about Mit RTK, about the club, or if something does not work. I cannot see your groups or your data yet.',
      f1: 'How do I sign up for a game?', f2: 'What is happening at the club?', f3: 'How do I get my racket strung?', f4: 'Something does not work',
      ph: 'Write to Ace', send: 'Send', skriver: 'Ace is writing …', kilde: 'Source', kilder: 'Sources',
      loft: 'Test version. You have {n} questions left today.', loft0: 'Test version. You have no more questions today.',
      sendH: 'Send the question to the club', sendT: 'Goes to kontakt@roskildetennisklub.dk with your name and email so they can reply. The conversation with Ace is included.',
      mail: 'Your email', sendKnap: 'Send', nejTak: 'No thanks', sender: 'Sending …', sendt: 'Sent to the club. They will reply by email.',
      fejl: 'Something went wrong. Please try again.'
    }
  };
  var FEJL_EN = {
    'Log ind igen': 'Please log in again',
    'Ace er kun for voksne medlemmer indtil videre.': 'Ace is only for adult members for now.',
    'Ace er ikke slået til.': 'Ace is not turned on.',
    'Skriv et spørgsmål': 'Please write a question',
    'Ace kan ikke svare lige nu. Prøv igen om lidt.': 'Ace cannot answer right now. Please try again shortly.',
    'Ace kan ikke svare lige nu. Prøv igen senere.': 'Ace cannot answer right now. Please try again later.',
    'Ace har travlt lige nu. Prøv igen om lidt.': 'Ace is busy right now. Please try again shortly.',
    'Ace kunne ikke svare. Prøv at skrive spørgsmålet på en anden måde.': 'Ace could not answer. Try asking in a different way.',
    'Ace har fået mange spørgsmål i dag. Prøv igen i morgen.': 'Ace has had many questions today. Please try again tomorrow.',
    'Skriv en kort besked': 'Please write a short message',
    'Skriv din mail, så kontoret kan svare': 'Please enter your email so the office can reply',
    'Ingen forbindelse. Tjek net og prøv igen.': 'No connection. Check your internet and try again.',
    'Systemet er optaget. Prøv igen om et øjeblik.': 'The system is busy. Please try again in a moment.'
  };

  function hent(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function sHent(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sGem(k, v) { try { if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) {} }
  function sprog() { if (/\/personale\//.test(location.pathname)) return 'da'; try { if (window.RTK_SPROG) return window.RTK_SPROG.sprog; } catch (e) {} return hent('rtk.sprog') === 'en' ? 'en' : 'da'; }
  function t(k, p) { var s = (T[sprog()] || T.da)[k] || T.da[k] || k; if (p) Object.keys(p).forEach(function (n) { s = s.split('{' + n + '}').join(p[n]); }); return s; }
  function fejlTekst(e) {
    var m = String(e && e.message || e || '');
    if (sprog() === 'en') {
      if (FEJL_EN[m]) return FEJL_EN[m];
      var r = /^Du har stillet (\d+) spørgsmål i dag\. Prøv igen i morgen\.$/.exec(m);
      if (r) return 'You have asked ' + r[1] + ' questions today. Please try again tomorrow.';
      if (window.MOTOR_EN && window.MOTOR_EN[m]) return window.MOTOR_EN[m];
    }
    return m || t('fejl');
  }
  // Kun en sti i Mit RTK (én skråstreg foran) eller klubbens hjemmeside må blive et link (gennemgangen fund 1)
  // Samme regel som motorens aceUrlOk_: kun klubbens egne adresser (gennemgangen 25. oktober L4)
  function linkOk(u) { u = String(u || ''); return /^\/[a-z0-9_\/-]*(\.html)?(#[a-z0-9_\/-]*)?$/i.test(u) && u.indexOf('//') < 0 ? u : (/^https:\/\/(www\.)?roskildetennisklub\.dk(\/[^\s\\]*)?$/i.test(u) ? u : ''); }
  function nyId() { return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2); }
  function el(tag, cls, tekst) { var e = document.createElement(tag); if (cls) e.className = cls; if (tekst !== undefined) e.textContent = tekst; return e; }

  // Ace på personalesiden (Lars 25. oktober kl. 09.02): siden hedder p_<navn>, teksterne er danske, og forslagene følger siden
  var PERSONALE = /\/personale\//.test(location.pathname);
  var SIDE = (function () {
    var p = location.pathname.replace(/\/+$/, '/');
    var m = /\/([a-z]+)\.html$/.exec(p);
    var n = m ? m[1] : 'forside';
    n = n === 'index' ? 'forside' : n;
    return PERSONALE ? 'p_' + n : n;
  })();
  var FORSLAG_P = {
    p_forside: ['Hvad kan jeg på personalesiden?', 'Hvordan logger jeg ind på en ny telefon?', 'Hvordan vælger jeg mit arbejdstøj?', 'Noget virker ikke'],
    p_opstrengning: ['Hvordan melder jeg en ketsjer klar?', 'Hvad gør jeg, når jeg har tømt skabet?', 'Hvordan laver jeg en ny kode til skabet?', 'Noget virker ikke'],
    p_bolde: ['Hvordan tager jeg bolde til træning?', 'Hvordan fortryder jeg?', 'Hvordan tæller jeg lageret op?', 'Noget virker ikke'],
    p_arbejdstoej: ['Hvordan vælger jeg mit arbejdstøj?', 'Hvordan finder jeg min skostørrelse?', 'Hvad sker der, når fristen udløber?', 'Noget virker ikke'],
    p_privattimer: ['Hvordan åbner jeg ledige tider?', 'Hvordan svarer jeg på en forespørgsel?', 'Hvordan kvitterer jeg for en time?', 'Noget virker ikke']
  };
  function forslag() { return PERSONALE ? (FORSLAG_P[SIDE] || ['Hvad kan jeg på denne side?', 'Hvad kan jeg på personalesiden?', 'Noget virker ikke']) : ['f1', 'f2', 'f3', 'f4'].map(function (k) { return t(k); }); }

  function konfig() {
    if (window.RTK_KONFIG) return Promise.resolve(window.RTK_KONFIG);
    return new Promise(function (ok, nej) {
      var s = document.createElement('script');
      s.src = '/konfig.js';
      s.onload = function () { window.RTK_KONFIG ? ok(window.RTK_KONFIG) : nej(new Error('konfig')); };
      s.onerror = function () { nej(new Error('konfig')); };
      document.head.appendChild(s);
    });
  }

  async function motor(handling, data, id, forsoeg) {
    var K = await konfig();
    var res, svar;
    try {
      res = await fetch(K.motor, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ modul: 'ace', handling: handling, data: data || {}, token: hent('rtk.token') || '', id: id || '' }) });
    } catch (e) { throw new Error('Ingen forbindelse. Tjek net og prøv igen.'); }
    try { svar = await res.json(); } catch (e) { throw new Error('Ingen forbindelse. Tjek net og prøv igen.'); }
    if (!svar.ok) {
      if ((svar.igen || svar.igang) && (forsoeg || 0) < 2) { await new Promise(function (ok) { setTimeout(ok, svar.igang ? 1500 : 500); }); return motor(handling, data, id, (forsoeg || 0) + 1); }
      var err = new Error(svar.fejl || 'Noget gik galt'); err.login = !!svar.login; throw err;
    }
    return svar.data;
  }

  // ------------------------------------------------------------ tilstand
  var GEN = 0; // tælles op ved log ud og skift af bruger, så et startsvar, der kommer for sent, ikke bruges
  var A = { start: null, aaben: false, beskeder: [], vist: [], samtale: nyId(), sidstBrugt: 0, sender: false, knap: null, ark: null, log: null, input: null, loftEl: null, sidstFokus: null };

  // Samtalen følger med fra side til side i 30 minutter (Lars 25. oktober kl. 08.06). Den ligger kun i browserfanen (sessionStorage),
  // bundet til login, og glemmes ved log ud, ved "Ny samtale" og når fanen lukkes
  var HUSK = 'rtk.ace.samtale' + (PERSONALE ? '.p' : ''), HUSK_MS = 30 * 60000; // personalesiden har sin egen samtale
  function huskGem() {
    A.sidstBrugt = Date.now();
    sGem(HUSK, JSON.stringify({ b: binding(), t: A.sidstBrugt, id: A.samtale, beskeder: A.beskeder.slice(-30), vist: A.vist.slice(-40) }));
  }
  function huskHent() {
    var g = null;
    try { g = JSON.parse(sHent(HUSK) || 'null'); } catch (e) { g = null; }
    if (!g || g.b !== binding() || !(Date.now() - g.t < HUSK_MS) || !Array.isArray(g.vist)) { sGem(HUSK, null); return; }
    A.samtale = /^[A-Za-z0-9-]{8,40}$/.test(String(g.id || '')) ? g.id : nyId();
    A.beskeder = Array.isArray(g.beskeder) ? g.beskeder : [];
    A.vist = g.vist; A.sidstBrugt = g.t;
  }
  function nySamtale() {
    sGem(HUSK, null);
    A.sender = false;
    A.beskeder = []; A.vist = []; A.samtale = nyId(); A.sidstBrugt = 0;
    var aaben = A.aaben;
    if (A.ark) { A.ark.remove(); A.ark = null; }
    A.aaben = false;
    if (aaben) aabn();
  }

  /** Er Ace til for den, der er logget ind? Huskes i fanen i 10 minutter, bundet til login, så den næste på telefonen ikke arver svaret. */
  function binding() { var tok = hent('rtk.token') || ''; return tok.slice(-16); }
  async function tjekStart() {
    var tok = hent('rtk.token');
    if (!tok) return null;
    var b0 = binding(), g0 = GEN;
    try {
      var g = JSON.parse(sHent('rtk.ace') || 'null');
      if (g && g.b === binding() && Date.now() - g.t < 600000) return g.s;
    } catch (e) {}
    var s;
    try { s = await motor('start', {}); }
    catch (e) {
      // Et nej (fx en junior uden rolle) huskes også i 10 minutter, så siden ikke spørger igen ved hvert sideskift (testagenten 25. oktober)
      if (g0 === GEN && b0 === binding() && /voksne|personale/i.test(String(e && e.message))) sGem('rtk.ace', JSON.stringify({ b: b0, t: Date.now(), s: { til: false } }));
      throw e;
    }
    if (g0 !== GEN || b0 !== binding()) return null; // der er logget ud eller ind imens (gennemgangen fund 2)
    sGem('rtk.ace', JSON.stringify({ b: b0, t: Date.now(), s: s }));
    return s;
  }

  function visKnap() {
    if (A.knap) return;
    var b = el('button', 'ace-knap');
    b.type = 'button';
    b.id = 'aceKnap';
    b.setAttribute('aria-haspopup', 'dialog'); b.setAttribute('aria-controls', 'aceArk'); b.setAttribute('aria-expanded', 'false');
    var img = el('img', 'ace-ikon'); img.src = '/ikon-medlem-192.png'; img.alt = ''; img.width = 32; img.height = 32;
    var sp = el('span', '', t('knap'));
    b.appendChild(img); b.appendChild(sp);
    b.setAttribute('aria-label', t('knap'));
    b.addEventListener('click', aabn);
    document.body.appendChild(b);
    document.body.classList.add('ace-har');
    A.knap = b;
    loftLyt();
    loft();
  }

  // Knappen må aldrig ligge oven på en bundlinje med knapper (Send i kurven, Lav ordren, chatfeltet). Står en bundlinje
  // nederst på skærmen, løftes knappen op over den (testagenten 25. oktober K2)
  var BUNDLINJER = '.af-bund, .gr-skriv, .rtk-ny', loftVent = false;
  function loft() {
    loftVent = false;
    if (!A.knap) return;
    var h = 0, H = window.innerHeight, W = document.documentElement.clientWidth;
    // Knappens egen plads, når den ikke er løftet: 16 px fra bund og højre kant (gennemgangen 26. oktober fund 1 og 2)
    var kh = A.knap.offsetHeight || 52, kw = A.knap.offsetWidth || 52;
    var kTop = H - 16 - kh, kBund = H - 16, kV = W - 16 - kw, kH = W - 16;
    var l = document.querySelectorAll(BUNDLINJER);
    for (var i = 0; i < l.length; i++) {
      var e = l[i];
      if (A.ark && A.ark.contains(e)) continue;
      var r = e.getBoundingClientRect();
      if (!r.height || !r.width || getComputedStyle(e).display === 'none' || getComputedStyle(e).visibility === 'hidden') continue;
      if (r.top < kBund && r.bottom > kTop && r.left < kH && r.right > kV) h = Math.max(h, H - r.top);
    }
    var v = h ? Math.round(h + 10) + 'px' : '';
    if (A.knap.style.bottom !== v) A.knap.style.bottom = v;
  }
  function loftSnart() { if (!loftVent) { loftVent = true; requestAnimationFrame(loft); } }
  function loftLyt() {
    if (A.loftLyt) return;
    A.loftLyt = true;
    window.addEventListener('scroll', loftSnart, { passive: true });
    window.addEventListener('resize', loftSnart);
    try { new MutationObserver(loftSnart).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden', 'style'] }); } catch (e) {}
  }
  function fjernAlt() {
    GEN++;
    if (A.aaben) luk();
    if (A.knap) { A.knap.remove(); A.knap = null; }
    if (A.ark) { A.ark.remove(); A.ark = null; }
    document.body.classList.remove('ace-har');
    A.start = null; A.b = ''; A.beskeder = []; A.vist = []; A.samtale = nyId(); A.sidstBrugt = 0;
    glem();
  }
  // Ved log ud glemmes begge samtaler, både medlemssidens og personalesidens (gennemgangen 25. oktober M2)
  function glem() { sGem('rtk.ace', null); sGem('rtk.ace.samtale', null); sGem('rtk.ace.samtale.p', null); }

  // ------------------------------------------------------------ arket
  function byg() {
    var ark = el('div', 'ace-ark');
    ark.id = 'aceArk';
    ark.setAttribute('role', 'dialog'); ark.setAttribute('aria-modal', 'true'); ark.setAttribute('aria-labelledby', 'aceTitel');
    var top = el('div', 'ace-top');
    var img = el('img', 'ace-ikon'); img.src = '/ikon-medlem-192.png'; img.alt = ''; img.width = 36; img.height = 36;
    var tt = el('div'); var h = el('b'); h.id = 'aceTitel';
    h.appendChild(document.createTextNode(t('titel') + ' ')); h.appendChild(el('span', 'ace-test', t('test')));
    if (PERSONALE) h.appendChild(el('span', 'ace-pers', t('pers')));
    tt.appendChild(h); tt.appendChild(el('small', '', t('under')));
    var lukK = el('button', 'luk', '×'); lukK.type = 'button'; lukK.id = 'aceLuk'; lukK.setAttribute('aria-label', t('luk'));
    lukK.addEventListener('click', luk);
    var nyK = el('button', 'ny', t('ny')); nyK.type = 'button'; nyK.id = 'aceNy'; nyK.setAttribute('aria-label', t('nyAria'));
    nyK.addEventListener('click', nySamtale);
    top.appendChild(img); top.appendChild(tt); top.appendChild(nyK); top.appendChild(lukK);
    var log = el('div', 'ace-log'); log.id = 'aceLog'; log.setAttribute('aria-live', 'polite');
    log.appendChild(el('p', 'ace-ai', t(PERSONALE ? 'aiP' : 'ai')));
    var hej = el('div', 'bob ace');
    hej.appendChild(el('p', '', t('hej', { navn: (A.start && A.start.fornavn) || '' }).replace('  ', ' ').replace(' .', '.')));
    hej.appendChild(el('p', '', t(PERSONALE ? 'hej2P' : 'hej2')));
    log.appendChild(hej);
    var fs = el('div', 'ace-forslag'); fs.id = 'aceForslag';
    forslag().forEach(function (tekst) {
      var c = el('button', 'ace-chip stiplet', tekst); c.type = 'button';
      c.addEventListener('click', function () { if (!A.sender) spoerg(tekst); });
      fs.appendChild(c);
    });
    log.appendChild(fs);
    if (A.vist.length) fs.remove(); // en samtale fra en anden side: forslagene er brugt
    var form = el('form', 'ace-skriv'); form.id = 'aceForm';
    // Feltet vokser med beskeden op til cirka 6 linjer (Lars 25. oktober kl. 13.38). Enter sender, Shift+Enter giver en ny linje
    var inp = el('textarea'); inp.id = 'aceInput'; inp.rows = 1; inp.maxLength = 500; inp.autocomplete = 'off';
    inp.setAttribute('placeholder', t('ph')); inp.setAttribute('aria-label', t('ph')); inp.setAttribute('enterkeyhint', TRYK ? 'enter' : 'send');
    var s = el('button', '', '↑'); s.type = 'submit'; s.id = 'aceSend'; s.setAttribute('aria-label', t('send'));
    form.appendChild(inp); form.appendChild(s);
    form.addEventListener('submit', function (e) { e.preventDefault(); var v = inp.value.trim(); if (v && !A.sender) spoerg(v); });
    inp.addEventListener('input', function () { vokse(inp); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && !TRYK) { e.preventDefault(); if (form.requestSubmit) form.requestSubmit(); else form.dispatchEvent(new Event('submit', { cancelable: true })); }
    });
    var loft = el('div', 'ace-loft'); loft.id = 'aceLoft';
    ark.appendChild(top); ark.appendChild(log); ark.appendChild(form); ark.appendChild(loft);
    // Esc lukker, også når fokus er gået til siden bag (fx efter et tryk på en knap, der blev slået fra)
    if (!A.escLyt) { A.escLyt = true; document.addEventListener('keydown', function (e) { if (A.aaben && A.ark && e.key === 'Escape' && !A.ark.contains(e.target)) { e.preventDefault(); luk(); } }); }
    ark.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); luk(); return; }
      if (e.key !== 'Tab') return;
      var f = ark.querySelectorAll('button:not([disabled]), a[href], input, textarea');
      if (!f.length) return;
      var foerste = f[0], sidste = f[f.length - 1];
      if (e.shiftKey && document.activeElement === foerste) { e.preventDefault(); sidste.focus(); }
      else if (!e.shiftKey && document.activeElement === sidste) { e.preventDefault(); foerste.focus(); }
    });
    document.body.appendChild(ark);
    A.ark = ark; A.log = log; A.input = inp; A.loftEl = loft;
    A.vist.forEach(function (x) { if (x && x.t === 'mig') bobMig(x.tekst); else if (x && x.t === 'ace') bobAce(x); });
    visLoft();
  }
  function visLoft() {
    if (!A.loftEl || !A.start) return;
    var n = Number(A.start.tilbage);
    A.loftEl.textContent = n > 0 ? t('loft', { n: n }) : t('loft0');
  }
  function aabn() {
    if (!A.start) return;
    if (A.vist.length && Date.now() - A.sidstBrugt > HUSK_MS) { A.beskeder = []; A.vist = []; A.samtale = nyId(); sGem(HUSK, null); if (A.ark) { A.ark.remove(); A.ark = null; } }
    if (!A.ark) byg();
    A.sidstFokus = document.activeElement;
    A.ark.classList.add('aaben');
    A.aaben = true; window.RTK_ACE = true;
    document.documentElement.classList.add('ace-laast');
    if (A.knap) A.knap.setAttribute('aria-expanded', 'true');
    setTimeout(function () { try { A.input.focus({ preventScroll: true }); } catch (e) { A.input.focus(); } }, 50);
  }
  function luk() {
    if (!A.ark) return;
    A.ark.classList.remove('aaben');
    A.aaben = false;
    window.RTK_ACE = !!(A.input && A.input.value); // en halvskrevet besked må ikke forsvinde ved en opdatering
    document.documentElement.classList.remove('ace-laast');
    if (A.knap) { A.knap.setAttribute('aria-expanded', 'false'); A.knap.focus(); }
    else if (A.sidstFokus && A.sidstFokus.focus) A.sidstFokus.focus();
  }
  function rul() { if (A.log) A.log.scrollTop = A.log.scrollHeight; }

  function bobMig(tekst) { var b = el('div', 'bob mig', tekst); A.log.appendChild(b); rul(); }
  function bobAce(s) {
    var b = el('div', 'bob ace');
    var p = el('div', 'ace-tekst', s.svar); b.appendChild(p);
    if (s.kilder && s.kilder.length) {
      var k = el('span', 'kilde');
      k.appendChild(document.createTextNode((s.kilder.length > 1 ? t('kilder') : t('kilde')) + ': '));
      s.kilder.forEach(function (x, i) {
        if (i) k.appendChild(document.createTextNode(' · '));
        if (linkOk(x.url)) { var a = el('a', '', x.titel); a.href = linkOk(x.url); if (/^https?:/.test(x.url)) { a.target = '_blank'; a.rel = 'noopener'; } k.appendChild(a); }
        else k.appendChild(document.createTextNode(x.titel));
      });
      b.appendChild(k);
    }
    if (s.knap && linkOk(s.knap.url)) {
      var r = el('div', 'ace-chips');
      var a2 = el('a', 'ace-chip', s.knap.tekst); a2.href = s.knap.url;
      if (/^https?:/.test(s.knap.url)) { a2.target = '_blank'; a2.rel = 'noopener'; }
      a2.addEventListener('click', function () { if (!/^https?:/.test(s.knap.url)) { window.RTK_ACE = false; } });
      r.appendChild(a2); b.appendChild(r);
    }
    A.log.appendChild(b); rul();
  }
  function bobFejl(tekst) { var b = el('div', 'bob ace fejl', tekst); A.log.appendChild(b); rul(); } // loggen læses op i forvejen (aria-live)

  function sendKort(spm) {
    var k = el('div', 'ace-send');
    k.appendChild(el('b', '', t(PERSONALE ? 'sendHP' : 'sendH')));
    var ta = el('textarea'); ta.value = spm; ta.maxLength = 1000; ta.setAttribute('aria-label', t(PERSONALE ? 'sendHP' : 'sendH'));
    k.appendChild(ta);
    var mail = null;
    if (A.start && !A.start.harMail) {
      mail = el('input'); mail.type = 'email'; mail.autocomplete = 'email'; mail.setAttribute('placeholder', t('mail')); mail.setAttribute('aria-label', t('mail'));
      mail.className = 'ace-mail'; k.appendChild(mail);
    }
    k.appendChild(el('small', '', t(PERSONALE ? 'sendTP' : 'sendT')));
    var msg = el('div', 'msg'); msg.setAttribute('role', 'status');
    var r = el('div', 'r');
    var ja = el('button', 'fyldt', t('sendKnap')); ja.type = 'button';
    var nej = el('button', 'tom', t('nejTak')); nej.type = 'button';
    var id = nyId();
    ja.addEventListener('click', async function () {
      ja.disabled = true; nej.disabled = true; msg.textContent = t('sender'); msg.className = 'msg';
      try {
        await motor('send', { tekst: ta.value, mail: mail ? mail.value.trim() : '', samtale: A.beskeder.slice(-20), side: SIDE }, id);
        k.innerHTML = ''; k.appendChild(el('p', 'ace-sendt', t(PERSONALE ? 'sendtP' : 'sendt'))); k.classList.add('sendt');
      } catch (e) {
        msg.textContent = fejlTekst(e); msg.className = 'msg fejl'; ja.disabled = false; nej.disabled = false;
        if (e.login) fjernAlt();
      }
    });
    nej.addEventListener('click', function () { k.remove(); A.input.focus(); });
    r.appendChild(ja); r.appendChild(nej);
    k.appendChild(r); k.appendChild(msg);
    A.log.appendChild(k); rul();
  }

  // Telefon og tablet: Enter giver en ny linje, og man sender med pilen, som i Beskeder og WhatsApp (Lars 25. oktober kl. 16.53)
  var TRYK = (function () { try { return matchMedia('(pointer: coarse)').matches && !matchMedia('(pointer: fine)').matches; } catch (e) { return false; } })();
  function vokse(f) {
    if (!f) return;
    f.style.height = 'auto';
    var h = Math.min(f.scrollHeight + 3, 150); // 3 er rammen, højst cirka 6 linjer, derefter kan man rulle i feltet
    f.style.height = h + 'px';
    f.style.overflowY = f.scrollHeight + 3 > 150 ? 'auto' : 'hidden';
  }

  async function spoerg(tekst) {
    tekst = String(tekst || '').trim().slice(0, 500);
    if (!tekst || A.sender) return;
    var fs = document.getElementById('aceForslag'); if (fs) fs.remove();
    A.input.value = ''; vokse(A.input);
    bobMig(tekst);
    A.beskeder.push({ fra: 'mig', tekst: tekst });
    A.vist.push({ t: 'mig', tekst: tekst });
    A.sender = true; document.getElementById('aceSend').disabled = true;
    var vent = el('div', 'bob ace vent', t('skriver')); A.log.appendChild(vent); rul();
    var g = GEN, id0 = A.samtale; // et svar, der kommer efter log ud eller "Ny samtale", bruges ikke
    try {
      var s = await motor('spoerg', { samtale: A.samtale, side: SIDE, sprog: sprog(), beskeder: A.beskeder.slice(-12) }, nyId());
      if (g !== GEN || id0 !== A.samtale) return;
      vent.remove();
      bobAce(s);
      A.beskeder.push({ fra: 'ace', tekst: s.svar });
      A.vist.push({ t: 'ace', svar: s.svar, kilder: s.kilder || [], knap: s.knap || null });
      huskGem();
      A.start.tilbage = s.tilbage;
      sGem('rtk.ace', JSON.stringify({ b: binding(), t: Date.now(), s: A.start }));
      visLoft();
      if (!s.besvaret) sendKort(tekst);
    } catch (e) {
      if (g !== GEN || id0 !== A.samtale) return;
      vent.remove();
      A.beskeder.pop(); A.vist.pop(); // spørgsmålet kom ikke igennem, så det sendes ikke med næste gang
      bobFejl(fejlTekst(e));
      if (e.login) { setTimeout(fjernAlt, 2500); }
    } finally {
      if (g !== GEN || id0 !== A.samtale) return; // en ny samtale er i gang, og den styrer selv knappen
      A.sender = false;
      var sb = document.getElementById('aceSend'); if (sb) sb.disabled = false;
      if (A.aaben && A.input && !document.querySelector('.ace-send textarea:focus, .ace-send input:focus')) { try { A.input.focus({ preventScroll: true }); } catch (e) {} }
      window.RTK_ACE = A.aaben || !!(A.input && A.input.value); // kun mens Ace er åben, ellers kan siden ikke opdatere sig selv (fund 11)
    }
  }

  // ------------------------------------------------------------ start
  async function start() {
    try {
      if (!hent('rtk.token')) { if (A.knap || A.start) fjernAlt(); else glem(); return; } // logget ud, også fra en anden side
      if (A.start && A.b !== binding()) fjernAlt(); // en anden har logget ind i samme fane (gennemgangen 25. oktober M1)
      var g = GEN;
      var s = await tjekStart();
      if (!s || !s.til || g !== GEN || A.knap) return;
      if (PERSONALE && !s.personale) return; // personalesiden: kun med en rolle
      if (!PERSONALE && s.kunPersonale) return; // en junior med en rolle: kun på personalesiden (Lars 25. oktober)
      A.start = s; A.b = binding();
      huskHent();
      visKnap();
    } catch (e) {
      // Ace er en ekstra hjælp. Fejler starten (fx ikke logget ind længere), vises knappen bare ikke
    }
  }
  // Ny person eller log ud i en anden fane: knap og samtale væk
  window.addEventListener('storage', function (e) { if (e.key === 'rtk.token' || e.key === null) { fjernAlt(); start(); } });
  document.addEventListener('sprog', function () {
    if (A.knap) { A.knap.querySelector('span').textContent = t('knap'); A.knap.setAttribute('aria-label', t('knap')); }
    if (A.ark && !A.beskeder.length) { A.ark.remove(); A.ark = null; if (A.aaben) { A.aaben = false; aabn(); } }
  });
  window.RTK_ACE_API = { start: start, fjern: fjernAlt, aabn: aabn, luk: luk };
  function senere() { if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2500 }); else setTimeout(start, 1200); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', senere); else senere();
})();
