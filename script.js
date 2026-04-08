let currency="UGX";
let selectedPlatform="instagram";
let selectedQuality="organic";

/* MULTIPLIERS */
const multipliers={
UGX:1,KES:0.05,TZS:0.0025,RWF:0.015,BIF:0.003,
NGN:0.25,ZAR:0.012,GHS:0.02,EGP:0.016,
USD:0.001,EUR:0.0009,GBP:0.0008
};

/* BASE */
const basePrices={
instagram:{followers:{starter:8000,organic:15000,premium:30000}},
tiktok:{followers:{starter:7000,organic:13000,premium:28000}},
facebook:{followers:{starter:7000,organic:12000,premium:25000}},
youtube:{subscribers:{starter:15000,organic:25000,premium:40000}}
};

/* PARTICLES */
function createParticles(){
let c=document.getElementById("particles");
for(let i=0;i<20;i++){
let p=document.createElement("div");
p.className="particle";
p.style.setProperty("--x",(Math.random()-0.5)*300+"px");
p.style.setProperty("--y",(Math.random()-0.5)*300+"px");
p.style.left="50%";p.style.top="50%";
c.appendChild(p);
setTimeout(()=>p.remove(),1000);
}
}

/* LOADER */
window.addEventListener("load",()=>{
let rocket=document.getElementById("rocket");
let loader=document.getElementById("loader");
let sound=document.getElementById("blastSound");

sound.play().catch(()=>{});
if(navigator.vibrate)navigator.vibrate([200,100,300]);

document.body.classList.add("shake");
createParticles();

setTimeout(()=>rocket.classList.add("launch"),300);
setTimeout(()=>document.body.classList.remove("shake"),500);

setTimeout(()=>{
loader.style.opacity="0";
setTimeout(()=>loader.style.display="none",500);
},1400);
});

/* PRICE */
function calculatePrice(){
let type=document.getElementById("type").value;
let qty=document.getElementById("quantity").value;
if(!type||!qty)return;

let base=basePrices[selectedPlatform]?.[type]?.[selectedQuality];
let total=(qty/1000)*base;
let final=total*multipliers[currency];

document.getElementById("price").innerText=`💰 ${Math.round(final)} ${currency}`;
}

/* PLATFORM */
function selectPlatform(el,p){
document.querySelectorAll(".platform-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedPlatform=p;
}

/* OPTIONS */
function updateServiceOptions(){
let type=document.getElementById("type").value;
let box=document.getElementById("serviceOptions");

if(!basePrices[selectedPlatform][type]){
box.innerHTML="Not available";
return;
}

box.innerHTML=`
<div onclick="selectedQuality='starter';calculatePrice()">Starter</div>
<div onclick="selectedQuality='organic';calculatePrice()">⭐ Organic</div>
<div onclick="selectedQuality='premium';calculatePrice()">🔥 Premium</div>
`;
}

/* ORDER */
function confirmOrder(){
let link=document.getElementById("link").value;
if(!link.startsWith("http")){
document.getElementById("linkError").innerText="Invalid link";
return;
}
let msg=`ORDER\n${document.getElementById("price").innerText}\n${link}`;
window.open(`https://wa.me/256740421134?text=${encodeURIComponent(msg)}`);
}

/* REF */
let ref=localStorage.getItem("ref")||("ASH"+Math.floor(Math.random()*999999));
localStorage.setItem("ref",ref);
document.getElementById("refCode").innerText=ref;

function shareReferral(){
let link="https://ashmediaboost-az.vercel.app/?ref="+ref;
window.open(`https://wa.me/?text=${encodeURIComponent("Join 🚀 "+link)}`);
}

/* GEO */
fetch("https://ipapi.co/json/")
.then(r=>r.json())
.then(d=>{
const map={UG:"UGX",KE:"KES",NG:"NGN",US:"USD"};
let c=map[d.country]||"USD";
currency=c;
document.getElementById("currency").value=c;
});

/* CHANGE */
function changeCurrency(){
currency=document.getElementById("currency").value;
calculatePrice();
  }
