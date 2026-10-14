/* Mit RTK: login med mobilnummer og sms-kode og kald til motoren på medlemssiderne.
   Bruges af beskeder.html og boern.html. Samme login som personalesiden: rtk.token i localStorage,
   så man kun logger ind én gang på telefonen. Mobilnummeret gemmes ikke i browseren.
   Teksterne lægges ind i window.TEKSTER, så sprog.js oversætter dem. */
(function () {
  // Adressen til motoren står i konfig.js, som indlæses før denne fil
  var KONFIG = window.RTK_KONFIG;

  var TEKST = {
    da: {
      kMobil: 'Dit mobilnummer', kLandekode: 'Danske numre skrives uden +45. Udenlandske med landekode, fx +46.', kSend: 'Send kode på sms', kKode: "Koden fra sms'en", kKodeTil: "Koden fra sms'en til {til}",
      kKodeMail: 'Koden fra mailen. Har klubben ikke din mail, kommer der ingen.', kGaelder: 'Koden gælder i 10 minutter. Kommer der ingen sms, så tjek nummeret.', kHusk: 'Husk mig på denne enhed i 30 dage',
      kLogInd: 'Log ind', kIgen: 'Send igen', kMail: 'Send koden på mail i stedet', kAndet: 'Brug et andet nummer',
      kSender: 'Sender koden …', kLogger: 'Logger ind …', kLogUd: 'Log ud', kLoggetInd: 'Logget ind som {navn}'
    },
    en: {
      kMobil: 'Your mobile number', kLandekode: 'Danish numbers without +45. Other countries with the country code, e.g. +46.', kSend: 'Send code by text', kKode: 'The code from the text message', kKodeTil: 'The code from the text message to {til}',
      kKodeMail: 'The code from the email. If the club does not have your email, none will arrive.', kGaelder: 'The code is valid for 10 minutes. If no text message arrives, check the number.', kHusk: 'Remember me on this device for 30 days',
      kLogInd: 'Log in', kIgen: 'Send again', kMail: 'Send the code by email instead', kAndet: 'Use another number',
      kSender: 'Sending the code …', kLogger: 'Logging in …', kLogUd: 'Log out', kLoggetInd: 'Logged in as {navn}'
    }
  };
  var MOTOR_EN = {
    'Ingen forbindelse. Tjek net og prøv igen.': 'No connection. Check your internet and try again.',
    'Noget gik galt': 'Something went wrong',
    'Log ind igen': 'Please log in again',
    'Skriv dit mobilnummer med 8 cifre': 'Please enter your mobile number with 8 digits',
    'Der er sendt mange koder. Vent 15 minutter, og prøv igen.': 'Many codes have been sent. Please wait 15 minutes and try again.',
    'Vi har ingen mail til dig. Brug sms.': 'We have no email address for you. Please use text message.',
    'Koden er udløbet. Bed om en ny.': 'The code has expired. Please ask for a new one.',
    'For mange forkerte forsøg. Bed om en ny kode.': 'Too many wrong attempts. Please ask for a new code.',
    'Nummeret har fået 5 koder i dag. Prøv igen i morgen, eller skriv til kontakt@roskildetennisklub.dk.': 'This number has had 5 codes today. Please try again tomorrow, or write to kontakt@roskildetennisklub.dk.',
    'For mange forsøg fra denne enhed. Prøv igen om en time.': 'Too many attempts from this device. Please try again in an hour.',
    'Login med kode er midlertidigt spærret. Prøv igen om 15 minutter.': 'Login with a code is temporarily blocked. Please try again in 15 minutes.',
    'Login med pinkode er slået fra. Brug dit mobilnummer og en kode på sms.': 'Login with a PIN is turned off. Use your mobile number and a code by text message.',
    'Du har sendt mange fejlmeldinger. Prøv igen om en time, eller skriv til kontakt@roskildetennisklub.dk.': 'You have sent many error reports. Please try again in an hour, or write to kontakt@roskildetennisklub.dk.',
    'Du har skrevet mange gange til opstrengeren. Prøv igen om en time, eller skriv til kontakt@roskildetennisklub.dk.': 'You have written to the stringer many times. Please try again in an hour, or write to kontakt@roskildetennisklub.dk.',
    'Forkert kode. Prøv igen.': 'Wrong code. Please try again.',
    'Kontoen er ikke aktiv. Skriv til kontakt@roskildetennisklub.dk.': 'The account is not active. Please write to kontakt@roskildetennisklub.dk.',
    'Systemet er optaget. Prøv igen om et øjeblik.': 'The system is busy. Please try again in a moment.',
    'Dine forældre bestemmer, hvordan beskederne kommer, indtil du fylder 18.': 'Your parents decide how messages are sent until you turn 18.',
    'Vælg notifikation, sms eller mail': 'Choose notification, text message or email',
    'Vi har ingen mail til dig. Skriv til klubben, hvis den skal på.': 'We have no email address for you. Write to the club if it should be added.',
    'Vi har intet mobilnummer til dig. Skriv til klubben, hvis det skal på.': 'We have no mobile number for you. Write to the club if it should be added.',
    'Du står ikke som forælder til barnet. Skriv til klubben.': 'You are not registered as a parent of this child. Please write to the club.',
    'Vælg sms, kun mail eller fra': 'Choose text message, email only or off',
    'Skriv et mobilnummer med 8 cifre': 'Please enter a mobile number with 8 digits',
    'Nummeret bruges allerede af en anden i klubben': 'This number is already used by someone else in the club',
    'Skriv en kort besked': 'Please write a short message',
    'Skriv din mail, så kontoret kan svare': 'Please enter your email so the office can reply',
    'Du har sendt mange beskeder. Prøv igen om en time, eller skriv direkte til kontakt@roskildetennisklub.dk.': 'You have sent many messages. Please try again in an hour, or write directly to kontakt@roskildetennisklub.dk.',
    'Beskeden kunne ikke sendes. Skriv direkte til kontakt@roskildetennisklub.dk.': 'The message could not be sent. Please write directly to kontakt@roskildetennisklub.dk.',
    'Dine forældre skal give dig adgang til Mit RTK under Mine børn først.': 'Your parents must give you access to Mit RTK under My children first.',
    'Ukendt valg': 'Unknown choice',
    'Kun for juniorer': 'For juniors only',
    'Vælg, hvad du vil bede om': 'Choose what you want to ask for',
    'Det er allerede slået til': 'It is already turned on',
    'Du har allerede bedt om det i dag. Prøv igen i morgen.': 'You have already asked for this today. Try again tomorrow.',
    'Skriv hvad der er galt': 'Please describe what is wrong',
    'Ugyldig push-nøgle': 'Invalid push key',
    'Du har sendt mange prøver. Vent 10 minutter.': 'You have sent many tests. Please wait 10 minutes.',
    'Notifikationer er ikke slået til på nogen af dine enheder': 'Notifications are not turned on on any of your devices',
    'Ukendt handling': 'Unknown request',
    'Kræver POST': 'Requires POST',
    'Ugyldig forespørgsel': 'Invalid request',
    'Du har ikke adgang til det her': 'You do not have access to this'
  };
  // Fejl med en dato i teksten oversættes med et mønster (gennemgangen 14. oktober, M7)
  var MDR_EN = { 'jan.': 'January', 'feb.': 'February', 'mar.': 'March', 'apr.': 'April', 'maj': 'May', 'jun.': 'June', 'jul.': 'July', 'aug.': 'August', 'sep.': 'September', 'okt.': 'October', 'nov.': 'November', 'dec.': 'December' };
  var MOTOR_EN_MOENSTRE = [
    [/^Du kan søge igen fra (\d{1,2})\. (\S+)$/, function (m, d, mdr) { return MDR_EN[mdr] ? 'You can apply again from ' + MDR_EN[mdr] + ' ' + d : null; }]
  ];
  window.TEKSTER = window.TEKSTER || { da: {}, en: {} };
  ['da', 'en'].forEach(function (s) { Object.keys(TEKST[s]).forEach(function (k) { if (window.TEKSTER[s][k] === undefined) window.TEKSTER[s][k] = TEKST[s][k]; }); });
  window.MOTOR_EN = Object.assign({}, MOTOR_EN, window.MOTOR_EN || {});

  function hent(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function gem(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function nyId() { return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2); }
  var enhed = hent('rtk.enhed'); if (!enhed) { enhed = nyId(); gem('rtk.enhed', enhed); }
  var paaLogud = null;

  function S() { return window.RTK_SPROG; }
  function t(k, v) { return String(S() ? S().t(k) : k).replace(/\{(\w+)\}/g, function (m, n) { return v && v[n] !== undefined ? v[n] : m; }); }
  function fejlTekst(m) {
    if (!(S() && S().sprog === 'en')) return m;
    if (window.MOTOR_EN[m]) return window.MOTOR_EN[m];
    for (var i = 0; i < MOTOR_EN_MOENSTRE.length; i++) {
      var r = String(m).match(MOTOR_EN_MOENSTRE[i][0]);
      var ud = r && MOTOR_EN_MOENSTRE[i][1].apply(null, r);
      if (ud) return ud;
    }
    return m;
  }

  /** Ét kald til motoren med sessionen. Udløbet session sender tilbage til login. */
  async function motor(modul, handling, data, id) {
    var res;
    try {
      res = await fetch(KONFIG.motor, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ modul: modul, handling: handling, data: data || {}, token: hent('rtk.token') || '', id: id || '' }) });
    } catch (e) { throw new Error('Ingen forbindelse. Tjek net og prøv igen.'); }
    var svar = await res.json();
    if (!svar.ok) {
      if (svar.login) { gem('rtk.token', null); if (paaLogud) paaLogud(); }
      throw new Error(svar.fejl || 'Noget gik galt');
    }
    return svar.data;
  }

  function el(tag, attr, tekst) {
    var e = document.createElement(tag);
    if (attr) Object.keys(attr).forEach(function (k) { if (attr[k] !== null && attr[k] !== undefined) e.setAttribute(k, attr[k]); });
    if (tekst !== undefined) e.textContent = tekst;
    return e;
  }
  function besked(e, tekst, slags) { e.textContent = tekst || ''; e.className = 'msg' + (slags ? ' ' + slags : ''); }

  /**
   * Tegn login i boksen. valg.onLogin(svar) kaldes efter login med { token, person }.
   * Mobil og kode i to trin, efter mockuppet "Log ind med mobilnummer og sms-kode".
   */
  function loginKort(boks, valg) {
    boks.innerHTML = '';
    var mobilNr = '';
    var f1 = el('form', { autocomplete: 'on', novalidate: '' });
    f1.appendChild(el('label', { 'for': 'kMobil', 'data-t': 'kMobil' }, t('kMobil')));
    var mobil = el('input', { id: 'kMobil', type: 'tel', inputmode: 'tel', autocomplete: 'tel', maxlength: '16', style: 'font-size:20px;letter-spacing:.04em' });
    f1.appendChild(mobil);
    f1.appendChild(el('p', { 'class': 'hint', id: 'kLandekode', 'data-t': 'kLandekode', style: 'margin:6px 0 0' }, t('kLandekode')));
    mobil.setAttribute('aria-describedby', 'kLandekode');
    var send = el('button', { type: 'submit', style: 'width:100%;margin-top:12px', 'data-t': 'kSend' }, t('kSend'));
    f1.appendChild(send);

    var f2 = el('form', { 'class': 'hidden', autocomplete: 'off', novalidate: '' });
    var kLabel = el('label', { 'for': 'kKode' }, t('kKode'));
    f2.appendChild(kLabel);
    var kodeFelt = el('div', { 'class': 'big' });
    var kode = el('input', { id: 'kKode', inputmode: 'numeric', pattern: '[0-9]*', maxlength: '6', autocomplete: 'one-time-code' });
    kodeFelt.appendChild(kode); f2.appendChild(kodeFelt);
    f2.appendChild(el('p', { 'class': 'hint', style: 'margin:6px 0 0', 'data-t': 'kGaelder' }, t('kGaelder')));
    var huskL = el('label', { style: 'display:flex;align-items:center;gap:12px;margin:14px 0 0;font-size:15px;min-height:44px' });
    var husk = el('input', { type: 'checkbox', id: 'kHusk', checked: '', style: 'width:22px;height:22px;min-height:0;margin:0;accent-color:#E6005C' });
    huskL.appendChild(husk); huskL.appendChild(el('span', { 'data-t': 'kHusk' }, t('kHusk')));
    f2.appendChild(huskL);
    f2.appendChild(el('button', { type: 'submit', style: 'width:100%;margin-top:10px', 'data-t': 'kLogInd' }, t('kLogInd')));
    var knapper = el('div', { style: 'display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:8px' });
    var igen = el('button', { type: 'button', 'class': 'ghost small', 'data-t': 'kIgen' }, t('kIgen'));
    var paaMail = el('button', { type: 'button', 'class': 'ghost small', 'data-t': 'kMail' }, t('kMail'));
    knapper.appendChild(igen); knapper.appendChild(paaMail); f2.appendChild(knapper);
    var andet = el('button', { type: 'button', 'class': 'ghost small', style: 'margin-top:8px', 'data-t': 'kAndet' }, t('kAndet'));
    f2.appendChild(andet);
    var msg = el('div', { 'class': 'msg', 'aria-live': 'polite' });
    boks.appendChild(f1); boks.appendChild(f2); boks.appendChild(msg);
    var kodeTil = null;

    async function sendKode(kanal) {
      besked(msg, t('kSender'));
      try {
        var r = await motor('kerne', 'sendKode', { mobil: mobilNr, kanal: kanal, enhed: enhed });
        kodeTil = r;
        kLabel.textContent = t(r.kanal === 'mail' ? 'kKodeMail' : 'kKodeTil', { til: r.til });
        paaMail.classList.toggle('hidden', !r.harMail || r.kanal === 'mail');
        f1.classList.add('hidden'); f2.classList.remove('hidden'); besked(msg, '');
        kode.value = ''; setTimeout(function () { kode.focus(); }, 50);
        if ('OTPCredential' in window) {
          var ac = new AbortController(); setTimeout(function () { ac.abort(); }, 600000);
          navigator.credentials.get({ otp: { transport: ['sms'] }, signal: ac.signal }).then(function (o) {
            if (o && o.code && !f2.classList.contains('hidden')) { kode.value = o.code; f2.requestSubmit(); }
          }).catch(function () {});
        }
      } catch (err) { besked(msg, fejlTekst(err.message), 'err'); }
    }
    f1.addEventListener('submit', function (e) { e.preventDefault(); mobilNr = mobil.value.trim(); sendKode('sms'); });
    f2.addEventListener('submit', async function (e) {
      e.preventDefault(); besked(msg, t('kLogger'));
      try {
        var r = await motor('kerne', 'kodeLogin', { mobil: mobilNr, kode: kode.value, enhed: enhed, husk: husk.checked });
        gem('rtk.token', r.token); kode.value = ''; besked(msg, '');
        if (window.RTK_VELKOMST) window.RTK_VELKOMST.tjek();
        valg.onLogin(r);
      } catch (err) { besked(msg, fejlTekst(err.message), 'err'); }
    });
    igen.addEventListener('click', function () { sendKode('sms'); });
    paaMail.addEventListener('click', function () { sendKode('mail'); });
    andet.addEventListener('click', function () { f2.classList.add('hidden'); f1.classList.remove('hidden'); besked(msg, ''); mobil.focus(); });
    document.addEventListener('sprog', function () {
      if (kodeTil) kLabel.textContent = t(kodeTil.kanal === 'mail' ? 'kKodeMail' : 'kKodeTil', { til: kodeTil.til });
    });
  }

  function logud() {
    // Telefonens notifikationer slås fra i samme kald, så en delt telefon ikke får den forriges beskeder
    if (hent('rtk.token')) motor('kerne', 'logud', hent('rtk.push.id') ? { pushId: hent('rtk.push.id') } : {}).catch(function () {});
    gem('rtk.push.id', null);
    gem('rtk.token', null);
    if (paaLogud) paaLogud();
  }

  window.RTK_KONTO = {
    motor: motor, loginKort: loginKort, logud: logud, t: t, fejlTekst: fejlTekst, nyId: nyId, besked: besked, el: el,
    loggetInd: function () { return !!hent('rtk.token'); },
    vedLogud: function (fn) { paaLogud = fn; }
  };
})();
