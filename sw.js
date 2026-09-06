self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{if(e.request.method==="GET")e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
self.addEventListener("push",e=>{
 let d={title:"Calendrier liturgique",body:"Une nouvelle célébration est disponible.",url:"/"};
 try{d={...d,...e.data.json()}}catch(_){}
 e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:"icon.svg",badge:"icon.svg",data:{url:d.url}}));
});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.openWindow(e.notification.data?.url||"/"))});