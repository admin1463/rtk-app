// Profilkortet, det samme i Grupper og i Padel (Lars 8. november 2026 kl. 08.44 til 08.52, mockup profilkort_v2.png).
// Billede og navn øverst, så afsnittene Om mig, Niveau og Billeder med overskrift. Tomme afsnit vises ikke.
// Niveau med tal og betegnelse, fx "Padel 3,5 · Øvet". Billederne 2 og 2 i et gitter, et tryk åbner fuld skærm.
// Bruges af grupper.html (egne_side.js, prKort) og personale/padel.html (Holdet). Ingen afhængigheder.
(function () {
  'use strict';
  const TEKST = {
    da: { omMig: 'Om mig', kontakt: 'Kontakt', ring: 'Ring til {navn}', skriv: 'Skriv en mail til {navn}', niveau: 'Niveau', billeder: 'Billeder', tennis: 'Tennis', padel: 'Padel', luk: 'Luk', forrige: 'Forrige billede', naeste: 'Næste billede',
      visBillede: 'Vis billede {n} af {navn} i fuld skærm', billederAf: 'Billeder af {navn}', billedeAf: 'Billede {n} af {af} fra {navn}', nAf: '{n} af {af}', profilkort: 'Profilkort for {navn}' },
    en: { omMig: 'About me', kontakt: 'Contact', ring: 'Call {navn}', skriv: 'Email {navn}', niveau: 'Level', billeder: 'Photos', tennis: 'Tennis', padel: 'Padel', luk: 'Close', forrige: 'Previous photo', naeste: 'Next photo',
      visBillede: 'Show photo {n} of {navn} full screen', billederAf: 'Photos of {navn}', billedeAf: 'Photo {n} of {af} from {navn}', nAf: '{n} of {af}', profilkort: 'Profile card for {navn}' }
  };
  const tk = (sprog, n, v) => (TEKST[sprog] || TEKST.da)[n].replace(/\{(\w+)\}/g, (_, k) => (v && v[k] !== undefined ? v[k] : ''));
  function el(tag, attr, tekst) {
    const e = document.createElement(tag);
    Object.keys(attr || {}).forEach((k) => e.setAttribute(k, attr[k]));
    if (tekst !== undefined && tekst !== null) e.textContent = tekst;
    return e;
  }
  /** Profilbilledet og de ekstra billeder som [{ i, thumb }]. i er pladsen: 0 er profilbilledet. */
  function billeder(p) {
    const ud = [];
    if (p && p.billede) ud.push({ i: 0, thumb: p.billede });
    ((p && p.ekstra) || []).forEach((x, k) => { if (x) ud.push({ i: k + 1, thumb: x }); });
    return ud;
  }
  /** "3,5" på dansk, "3.5" på engelsk. */
  function tal(v, sprog) { const n = Number(v); if (!n) return ''; const s = n.toFixed(1); return sprog === 'en' ? s : s.replace('.', ','); }
  /** Betegnelsen for et niveau (fx "Øvet"), eller tom. Bruger NIVEAUER fra niveauer.js, hvis den findes. */
  function betegnelse(sport, v, sprog) {
    const N = typeof NIVEAUER !== 'undefined' ? NIVEAUER : (window.NIVEAUER || null);
    const l = N && N[sport] && N[sport].niveauer;
    const x = l && l.find((y) => y.v === Number(v));
    return x && x.navn ? (x.navn[sprog] || '') : '';
  }
  /** Sikre billedadresser: kun data:image eller https. */
  const okBillede = (u) => typeof u === 'string' && /^(data:image\/(jpeg|png|webp);base64,|https:\/\/)/.test(u);
  const css = (u) => 'url("' + String(u).replace(/["\\\n\r]/g, '') + '")';

  /**
   * Et profilkort som element. o: { pid, navn, linje, p (profilen fra Firebase eller null), egen (tekst efter navnet),
   * sprog ('da' eller 'en'), farve (baggrund uden billede), initialer, onBillede(billeder, i), betegnelse(sport, v) (valgfri) }.
   */
  function kort(o) {
    const sprog = o.sprog === 'en' ? 'en' : 'da';
    const p = o.p || {};
    const bil = billeder(p).filter((b) => okBillede(b.thumb));
    const k = el('div', { 'class': 'pr-kort pk' });
    const hoved = el('div', { 'class': 'pk-hoved' });
    if (p.billede && okBillede(p.billede)) {
      const b = el('button', { type: 'button', 'class': 'pr-billede pk-billede', 'aria-label': tk(sprog, 'visBillede', { n: 1, navn: o.navn }) });
      b.style.backgroundImage = css(p.billede);
      b.addEventListener('click', () => o.onBillede && o.onBillede(bil, 0));
      hoved.append(b);
    } else {
      const s = el('span', { 'class': 'pr-billede pk-billede tom', 'aria-hidden': 'true' }, o.initialer || '');
      if (o.farve) s.style.background = o.farve;
      hoved.append(s);
    }
    const midt = el('div', { 'class': 'pk-midt' });
    midt.append(el('div', { 'class': 'pr-navn pk-navn' }, o.navn + (o.egen ? ' (' + o.egen + ')' : '')));
    if (o.linje) midt.append(el('div', { 'class': 'pk-linje' }, o.linje));
    hoved.append(midt);
    k.append(hoved);
    if (p.tekst) {
      k.append(el('h3', { 'class': 'pk-h' }, tk(sprog, 'omMig')));
      k.append(el('p', { 'class': 'pr-tekst pk-tekst' }, p.tekst));
    }
    const niv = p.niveau || {};
    const sporter = ['tennis', 'padel'].filter((s) => Number(niv[s]));
    if (sporter.length) {
      k.append(el('h3', { 'class': 'pk-h' }, tk(sprog, 'niveau')));
      const ul = el('ul', { 'class': 'pk-niv' });
      sporter.forEach((s) => {
        const li = el('li', null, tk(sprog, s) + ' ');
        const navn = o.betegnelse ? o.betegnelse(s, niv[s]) : betegnelse(s, niv[s], sprog);
        li.append(el('b', null, tal(niv[s], sprog) + (navn ? ' · ' + navn : '')));
        ul.append(li);
      });
      k.append(ul);
    }
    // Telefonnummer og mail, hvis personen selv har skrevet dem (Lars 8. november 2026 kl. 08.58)
    const mobil = typeof p.mobil === 'string' && /^\+?[0-9 ]{8,20}$/.test(p.mobil) ? p.mobil : '';
    const mail = typeof p.mail === 'string' && /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/.test(p.mail) && p.mail.length <= 120 ? p.mail : '';
    if (mobil || mail) {
      k.append(el('h3', { 'class': 'pk-h' }, tk(sprog, 'kontakt')));
      const ul = el('ul', { 'class': 'pk-kontakt' });
      if (mobil) { const li = el('li'); li.append(el('a', { href: 'tel:' + mobil.replace(/ /g, ''), 'aria-label': tk(sprog, 'ring', { navn: o.navn }) + ': ' + mobil }, mobil)); ul.append(li); }
      if (mail) { const li = el('li'); li.append(el('a', { href: 'mailto:' + mail, 'aria-label': tk(sprog, 'skriv', { navn: o.navn }) + ': ' + mail }, mail)); ul.append(li); }
      k.append(ul);
    }
    if (bil.length) {
      const h = el('h3', { 'class': 'pk-h' }, tk(sprog, 'billeder') + ' ');
      h.append(el('span', null, String(bil.length)));
      k.append(h);
      const g = el('div', { 'class': 'pr-ekstra pk-gitter' });
      bil.forEach((b, n) => {
        const knap = el('button', { type: 'button', 'aria-label': tk(sprog, 'visBillede', { n: n + 1, navn: o.navn }) });
        knap.style.backgroundImage = css(b.thumb);
        knap.addEventListener('click', () => o.onBillede && o.onBillede(bil, n));
        g.append(knap);
      });
      k.append(g);
    }
    return k;
  }

  // ---------- Arket nedefra (Padel: Holdet. Grupper: et medlem i gruppen)
  let aabentArk = null;
  /** Vis indhold i et ark nedefra. Returnerer { luk, krop }. Esc, Luk og et tryk udenfor lukker. */
  function ark(sprog, titel) {
    if (aabentArk) aabentArk.luk();
    const foer = document.activeElement;
    const slør = el('div', { 'class': 'pk-slor' });
    const a = el('div', { 'class': 'pk-ark', role: 'dialog', 'aria-modal': 'true', 'aria-label': titel || '' });
    a.append(el('span', { 'class': 'pk-greb', 'aria-hidden': 'true' }));
    const krop = el('div', { 'class': 'pk-krop' });
    const lk = el('button', { type: 'button', 'class': 'ghost small pk-luk' }, tk(sprog, 'luk'));
    a.append(krop, lk);
    document.body.append(slør, a);
    document.body.classList.add('pk-aaben');
    const tast = (e) => { if (e.key === 'Escape' && !e.defaultPrevented && !aabenFuld) { e.preventDefault(); luk(); } };
    function luk() {
      if (aabentArk !== res) return;
      aabentArk = null;
      slør.remove(); a.remove(); document.body.classList.remove('pk-aaben');
      document.removeEventListener('keydown', tast);
      if (foer && foer.isConnected && foer.focus) foer.focus();
    }
    lk.addEventListener('click', luk);
    slør.addEventListener('click', luk);
    document.addEventListener('keydown', tast);
    const res = { luk, krop };
    aabentArk = res;
    setTimeout(() => lk.focus(), 0);
    return res;
  }

  // ---------- Billedet i fuld skærm (Padel. Grupper har sin egen i egne_side.js)
  let aabenFuld = null;
  /** o: { navn, billeder, i, sprog, hentStort(b) -> Promise<url eller null>, info(b) -> tekst, knapper: [{ tekst, vis(b), fn(b, styr) }] }.
   * Viser det lille billede først og det store, når det er hentet. knapper (Padel-billeder, 8. november 2026) står i bunden.
   * styr: { luk(), fjern() (tag billedet ud af visningen), stort() (det store billede, hvis det er hentet) }. */
  function fuld(o) {
    if (!o.billeder || !o.billeder.length) return;
    const sprog = o.sprog === 'en' ? 'en' : 'da';
    const foer = document.activeElement;
    const f = el('div', { 'class': 'pk-fuldv', role: 'dialog', 'aria-modal': 'true', 'aria-label': tk(sprog, 'billederAf', { navn: o.navn }) });
    const top = el('div', { 'class': 'pk-fuldv-top' });
    const tal2 = el('span');
    const lk = el('button', { type: 'button', 'class': 'pk-fuldv-luk', 'aria-label': tk(sprog, 'luk') }, '×');
    top.append(tal2, lk);
    const img = el('img', { alt: '' });
    const fo = el('button', { type: 'button', 'class': 'pk-fuldv-pil forrige', 'aria-label': tk(sprog, 'forrige') }, '‹');
    const nae = el('button', { type: 'button', 'class': 'pk-fuldv-pil naeste', 'aria-label': tk(sprog, 'naeste') }, '›');
    const bund = el('div', { 'class': 'pk-fuldv-bund' });
    f.append(top, img, fo, nae);
    if (o.info || (o.knapper && o.knapper.length)) f.append(bund);
    document.body.append(f);
    let n = o.billeder.length;
    const x = { i: o.i || 0, stort: {} };
    aabenFuld = x;
    function vis(i) {
      x.i = (i + n) % n;
      const b = o.billeder[x.i];
      img.src = b.thumb;
      img.alt = tk(sprog, 'billedeAf', { n: x.i + 1, af: n, navn: o.navn });
      tal2.textContent = o.navn + (n > 1 ? ' · ' + tk(sprog, 'nAf', { n: x.i + 1, af: n }) : '');
      fo.classList.toggle('hidden', n < 2); nae.classList.toggle('hidden', n < 2);
      const nr = x.i;
      if (o.hentStort) Promise.resolve(o.hentStort(b)).then((u) => { if (okBillede(u)) x.stort[nr] = u; if (aabenFuld === x && x.i === nr && okBillede(u)) img.src = u; }).catch(() => {});
      tegnBund(b);
    }
    function tegnBund(b) {
      if (!bund.isConnected) return;
      bund.innerHTML = '';
      if (o.info) bund.append(el('span', { 'class': 'pk-fuldv-info' }, o.info(b) || ''));
      const kn = el('div', { 'class': 'pk-fuldv-kn' });
      (o.knapper || []).filter((k) => !k.vis || k.vis(b)).forEach((k) => {
        const knap = el('button', { type: 'button', 'class': 'pk-fuldv-knap' + (k.klasse ? ' ' + k.klasse : '') }, k.tekst);
        knap.addEventListener('click', (e) => { e.stopPropagation(); k.fn(b, styr, knap); });
        kn.append(knap);
      });
      bund.append(kn);
    }
    const styr = {
      luk: () => luk(),
      stort: () => x.stort[x.i] || o.billeder[x.i].thumb,
      fjern: () => { o.billeder.splice(x.i, 1); x.stort = {}; n = o.billeder.length; if (!n) luk(); else vis(Math.min(x.i, n - 1)); }
    };
    function luk() {
      if (aabenFuld !== x) return;
      aabenFuld = null; f.remove(); document.removeEventListener('keydown', tast, true);
      if (o.vedLuk) { try { o.vedLuk(); } catch (e) { /* intet */ } }
      if (foer && foer.isConnected && foer.focus) foer.focus();
    }
    function tast(e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); luk(); }
      else if (e.key === 'ArrowLeft' && n > 1) vis(x.i - 1);
      else if (e.key === 'ArrowRight' && n > 1) vis(x.i + 1);
      else if (e.key === 'Tab') {
        const k = [...f.querySelectorAll('button:not(.hidden)')]; const j = k.indexOf(document.activeElement);
        e.preventDefault(); k[(j + (e.shiftKey ? -1 : 1) + k.length) % k.length].focus();
      }
    }
    lk.addEventListener('click', luk);
    fo.addEventListener('click', () => vis(x.i - 1));
    nae.addEventListener('click', () => vis(x.i + 1));
    f.addEventListener('click', (e) => { if (e.target === f || e.target === img) luk(); });
    document.addEventListener('keydown', tast, true);
    let x0 = null;
    f.addEventListener('touchstart', (e) => { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
    f.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50 && n > 1) vis(x.i + (dx < 0 ? 1 : -1)); });
    vis(x.i);
    lk.focus();
  }

  window.RTKPK = { kort, ark, fuld, billeder, betegnelse, tal, tekst: tk };
})();
