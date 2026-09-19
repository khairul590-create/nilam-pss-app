const CACHE='nilam-pss-v1';
const ASSETS=['/'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(nr=>{if(nr.ok){const c=nr.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c))}return nr}).catch(()=>caches.match('/'))))});
self.addEventListener('push',e=>{const d=e.data?e.data.json():{title:'NILAM PSS',body:'Ada kemas kini baharu.'};e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:'/manifest.json',badge:'/manifest.json',data:d.url||'/'}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow(e.notification.data||'/'))});
