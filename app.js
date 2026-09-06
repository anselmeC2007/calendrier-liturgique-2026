const MONTHS=["Septembre","Octobre","Novembre","Décembre"];
const DOW=["L","M","M","J","V","S","D"];
let data=[];
let monthIndex=new Date().getMonth()>=8?new Date().getMonth()-8:0;
const todayISO=new Date().toISOString().slice(0,10);

const colorMap={
 white:["⚪","Blanc"],green:["🟢","Vert"],red:["🔴","Rouge"],violet:["🟣","Violet"],rose:["🌸","Rose"]
};

async function init(){
 data=await fetch("data/calendar-2026-sept-dec.json").then(r=>r.json());
 render();
 if("serviceWorker" in navigator) await navigator.serviceWorker.register("sw.js");
 document.getElementById("notifyBtn").onclick=enableNotifications;
 document.getElementById("prevMonth").onclick=()=>{monthIndex=Math.max(0,monthIndex-1);render()};
 document.getElementById("nextMonth").onclick=()=>{monthIndex=Math.min(3,monthIndex+1);render()};
}
function niceDate(s){
 return new Intl.DateTimeFormat("fr-FR",{weekday:"long",day:"numeric",month:"long"}).format(new Date(s+"T12:00:00"));
}
function entry(date){return data.find(x=>x.date===date)}
function colorText(e){const [emoji,name]=colorMap[e.color]||["",""];return `${emoji} ${name}`}
function render(){
 const now=entry(todayISO)||data[0];
 document.getElementById("todayHeading").textContent=now?niceDate(now.date):"Calendrier liturgique";
 document.getElementById("todaySub").textContent="Septembre à décembre 2026";
 const hero=document.getElementById("todayCard");
 hero.innerHTML=`<div class="date">${niceDate(now.date)}</div><h2>${now.title}</h2><div class="color">${colorText(now)}</div>`;
 const ym=`2026-${String(monthIndex+9).padStart(2,"0")}`;
 document.getElementById("monthLabel").textContent=MONTHS[monthIndex]+" 2026";
 const first=new Date(ym+"-01T12:00:00");
 const days=new Date(first.getFullYear(),first.getMonth()+1,0).getDate();
 const offset=(first.getDay()+6)%7;
 let html=DOW.map(x=>`<div class="dow">${x}</div>`).join("");
 for(let i=0;i<offset;i++) html+=`<div class="day empty"></div>`;
 for(let d=1;d<=days;d++){
   const iso=`${ym}-${String(d).padStart(2,"0")}`;
   const e=entry(iso); if(!e) continue;
   html+=`<div class="day ${e.color} ${iso===todayISO?"today":""}" data-date="${iso}">
      <div class="n">${d}</div><div class="dot">${colorText(e)}</div>
      <div class="dot">${e.title}</div>
   </div>`;
 }
 document.getElementById("calendar").innerHTML=html;
 document.querySelectorAll(".day[data-date]").forEach(x=>x.onclick=()=>showDay(x.dataset.date));
}
function showDay(date){
 const e=entry(date); if(!e)return;
 document.getElementById("todayCard").innerHTML=`<div class="date">${niceDate(date)}</div><h2>${e.title}</h2><div class="color">${colorText(e)}</div>`;
 window.scrollTo({top:0,behavior:"smooth"});
}
async function enableNotifications(){
 if(!("Notification" in window)||!("serviceWorker" in navigator)){
   alert("Les notifications web ne sont pas prises en charge sur ce navigateur.");
   return;
 }
 const permission=await Notification.requestPermission();
 if(permission!=="granted"){alert("Il faut autoriser les notifications pour les recevoir.");return;}
 const reg=await navigator.serviceWorker.ready;
 const config=await fetch("config.json").then(r=>r.json()).catch(()=>({vapidPublicKey:""}));
 if(!config.vapidPublicKey){
   alert("Le site est installé, mais le serveur de notifications n’est pas encore configuré. Suis le guide INSTALLATION.");
   return;
 }
 const sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlBase64ToUint8Array(config.vapidPublicKey)});
 await fetch(config.subscribeUrl||"/api/subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(sub)});
 alert("Notifications activées ✅");
}
function urlBase64ToUint8Array(base64String){
 const padding="=".repeat((4-base64String.length%4)%4);
 const base64=(base64String+padding).replace(/-/g,"+").replace(/_/g,"/");
 const raw=atob(base64); return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));
}
init();