/* Mit RTK: modtager notifikationer (push) og viser dem. 12. oktober 2026.
   Motoren sender kun data (titel, tekst, link, tag) gennem Firebase Cloud Messaging, og filen her viser
   beskeden. Så ser den ens ud på iPhone, Android og computer, og et tryk åbner Mit RTK det rigtige sted.
   Filen bruger ikke Firebase selv og henter intet udefra. */
'use strict';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let p = {};
  try { const j = e.data ? e.data.json() : {}; p = j.data || j; } catch (err) { p = { tekst: e.data ? e.data.text() : '' }; }
  const titel = String(p.titel || 'Mit RTK');
  const valg = {
    body: String(p.tekst || ''),
    icon: '/ikon-medlem-192.png',
    badge: '/ikon-medlem-192.png',
    data: { link: String(p.link || '/') },
    lang: 'da'
  };
  if (p.tag) { valg.tag = String(p.tag); valg.renotify = true; }
  // iPhone kræver, at hver push viser en besked. Derfor vises den altid.
  e.waitUntil(self.registration.showNotification(titel, valg));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const sti = (e.notification.data && e.notification.data.link) || '/';
  const maal = new URL(sti, self.location.origin);
  if (maal.origin !== self.location.origin) return; // kun links til Mit RTK
  e.waitUntil((async () => {
    const vinduer = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const v of vinduer) {
      if (new URL(v.url).origin === maal.origin && 'focus' in v) {
        await v.focus();
        if ('navigate' in v) { try { await v.navigate(maal.href); } catch (err) { /* nogle browsere tillader det ikke */ } }
        return;
      }
    }
    await self.clients.openWindow(maal.href);
  })());
});
