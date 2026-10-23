/* Mit RTK: vis det, motoren sidst har lagt i Firebase, med det samme (trin 1, Lars 23. oktober 2026 kl. 20.57).
   Hvert kald til motoren koster 2 til 2,5 sekunder hos Google. Motoren lægger derfor en kopi af hver side i Firestore
   (visning/{uid}/sider/{navn} og visningFaelles/{navn}, se rtk-motor/kerne/visning.gs). Siden lytter på kopien og viser den
   straks, mens den stadig henter det nyeste fra motoren i baggrunden. Ændrer en anden noget, kommer det af sig selv.

   Brug:
     RTKV.lyt(motor, 'privatTraener', (data) => { ... })   // personens egen side. Giver en funktion, der stopper lytningen
     RTKV.lyt(motor, 'privat', fn, { faelles: true })       // det, alle ser ens
   motor er sidens egen funktion til motoren (motor(modul, handling, data)), som bruges til Firebase-adgangen.
   Data har feltet laest (motorens tid, da den læste arkene). Siden viser kun data, der er nyere end det, den viser.
   Går noget galt (ingen Firebase, spærret login, intet net), sker der ingenting: siden har stadig svaret fra motoren. */
(function () {
  var K = window.RTK_KONFIG || {};
  var fb = null, fbLover = null, login = null, gen = 0;

  function hent(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function gem(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }

  function hentFirebase() {
    if (fbLover) return fbLover;
    var base = 'https://www.gstatic.com/firebasejs/' + K.firebaseVersion + '/';
    fbLover = Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-auth.js'), import(base + 'firebase-firestore.js')]).then(function (m) {
      var app = m[0], auth = m[1], fs = m[2];
      var emu = window.RTK_EMULATOR;
      var a = app.initializeApp(emu && emu.projekt ? Object.assign({}, K.firebase, { projectId: emu.projekt }) : K.firebase);
      // Samme lagring som Grupper, så et login dér også gælder her (og omvendt)
      var au = auth.initializeAuth(a, { persistence: [auth.indexedDBLocalPersistence, auth.browserLocalPersistence, auth.browserSessionPersistence] });
      var db = fs.getFirestore(a);
      // Firestore skriver selv i konsollen, når forbindelsen afbrydes (fx når siden genindlæses). Det håndterer siden selv
      try { fs.setLogLevel('silent'); } catch (e) {}
      if (emu) { auth.connectAuthEmulator(au, 'http://127.0.0.1:9099', { disableWarnings: true }); fs.connectFirestoreEmulator(db, '127.0.0.1', 8080); }
      fb = { auth: auth, fs: fs, au: au, db: db };
      return fb;
    });
    // Fejler hentningen (fx intet net), prøves der igen næste gang (gennemgangen M6)
    fbLover.catch(function () { fbLover = null; });
    return fbLover;
  }

  /** Et kort fingeraftryk af login-sessionen i motoren. Samme som Grupper bruger. */
  function binding() {
    var tok = hent('rtk.token') || '';
    if (window.crypto && crypto.subtle) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode('rtk.gr:' + tok)).then(function (h) {
        return Array.from(new Uint8Array(h)).slice(0, 12).map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
      });
    }
    var a = 2166136261, b = 5381;
    for (var i = 0; i < tok.length; i++) { var c = tok.charCodeAt(i); a = Math.imul(a ^ c, 16777619) >>> 0; b = (Math.imul(b, 33) + c) >>> 0; }
    return Promise.resolve('f' + a.toString(16) + b.toString(16));
  }

  /** Log ind i Firebase med det samme login som i motoren. Genbruger et login fra Grupper. Giver uid. */
  function logInd(motor) {
    if (login) return login;
    var g = gen, tok = hent('rtk.token');
    login = (async function () {
      if (!tok) throw new Error('ikke logget ind');
      var f = await hentFirebase();
      await f.au.authStateReady();
      var bind = await binding();
      var u = f.au.currentUser;
      if (u && (hent('rtk.gr.uid') !== u.uid || hent('rtk.gr.tok') !== bind)) { await f.auth.signOut(f.au).catch(function () {}); u = null; }
      if (!u) {
        var svar = await motor('kerne', 'firebase');
        if (g !== gen || hent('rtk.token') !== tok) throw new Error('logget ud imens');
        var c = await f.auth.signInWithCustomToken(f.au, svar.token);
        u = c.user;
        // Logget ud eller ind som en anden, mens Firebase-login stod på: log ud igen (gennemgangen V2)
        if (g !== gen || hent('rtk.token') !== tok) { await f.auth.signOut(f.au).catch(function () {}); throw new Error('logget ud imens'); }
        gem('rtk.gr.uid', u.uid); gem('rtk.gr.tok', bind);
      }
      if (g !== gen) throw new Error('logget ud imens');
      return u.uid;
    })();
    login.catch(function () { login = null; });
    return login;
  }

  /** Lyt på en visning. fn(data) kaldes hver gang, den ændres. Giver en funktion, der stopper. */
  function lyt(motor, navn, fn, valg) {
    valg = valg || {};
    var stop = null, stoppet = false, forsoeg = 0, g = gen;
    function start() {
      if (stoppet || g !== gen) return;
      logInd(motor).then(function (uid) {
        if (stoppet || g !== gen) return;
        var sti = valg.faelles ? 'visningFaelles/' + navn : 'visning/' + uid + '/sider/' + navn;
        stop = fb.fs.onSnapshot(fb.fs.doc(fb.db, sti), function (d) {
          if (stoppet || g !== gen || !d.exists()) return;
          var x = d.data();
          if (Number(x.v) !== 1 || typeof x.data !== 'string') return;
          var data; try { data = JSON.parse(x.data); } catch (e) { return; }
          if (data) fn(data);
        }, function (e) {
          // Ingen adgang eller intet net: siden har svaret fra motoren. Prøv igen om lidt, højst tre gange (gennemgangen M6)
          window.RTKV_FEJL = 'lyt ' + navn + ': ' + (e && e.code || e);
          stop = null;
          if (++forsoeg <= 3) setTimeout(start, 20000 * forsoeg);
        });
      }).catch(function (e) {
        window.RTKV_FEJL = 'login: ' + (e && e.message || e);
        if (++forsoeg <= 3) setTimeout(start, 20000 * forsoeg);
      });
    }
    start();
    return function () { stoppet = true; if (stop) stop(); };
  }

  /** Log ud: glem Firebase-login på denne telefon. Giver et løfte, der højst venter et sekund. */
  function logUd() {
    gen++; login = null;
    gem('rtk.gr.uid', null); gem('rtk.gr.tok', null);
    var ud = fb ? fb.auth.signOut(fb.au).catch(function () {}) : glemFirebase();
    return Promise.race([ud, new Promise(function (ok) { setTimeout(ok, 1000); })]);
  }
  /** Firebase er ikke hentet på denne side: slet det gemte login direkte (Firebase gemmer det i IndexedDB). */
  function glemFirebase() {
    return new Promise(function (ok) {
      try { var r = indexedDB.deleteDatabase('firebaseLocalStorageDb'); r.onsuccess = r.onerror = r.onblocked = function () { ok(); }; }
      catch (e) { ok(); }
    });
  }

  /** Hvem er logget ind i Firebase lige nu (til test og fejlfinding). */
  function hvem() { return fb && fb.au.currentUser ? fb.au.currentUser.uid : null; }

  window.RTKV = { lyt: lyt, logUd: logUd, logInd: logInd, glemFirebase: glemFirebase, hvem: hvem };
})();
