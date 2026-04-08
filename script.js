const topBar=document.getElementById("topBar");
const liveUsers=document.getElementById("liveUsers");
const price=document.getElementById("price");

setTimeout(()=>{
loader.style.display="none";
},2200);

let selectedPlatform="instagram";
let selectedQuality="organic";
let currency="UGX";

const rates={UGX:1,KES:0.035,NGN:0.2,USD:0.00027};

const basePrices={
instagram:{
followers:{starter:8000,organic:12000,premium:25000},
likes:{starter:3000,organic:6000,premium:12000},
views:{starter:2000,organic:4000,premium:8000}
},
tiktok:{
followers:{starter:7000,organic:10000,premium:22000},
likes:{starter:2500,organic:5000,premium:10000},
views:{starter:1500,organic:3000,premium:7000}
},
facebook:{
followers:{starter:7000,organic:9000,premium:18000},
likes:{starter:3000,organic:6000,premium:12000}
},
youtube:{
views:{starter:5000,organic:10000,premium:20000},
likes:{starter:4000,organic:8000,premium:15000},
subscribers:{starter:15000,organic:25000,premium:40000}
}
};

function selectPlatform(el,p){
document.querySelectorAll(".platform-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedPlatform=p;
calculatePrice();
}

function updateServiceOptions(){
let type=document.getElementById("type").value;
let box=document.getElementById("serviceOptions");

if(!basePrices[selectedPlatform][type]){
box.innerHTML="Not available";
return;
}

box.innerHTML=`
<div class="option-card" onclick="selectQuality(this,'starter')">⚡ Starter</div>
<div class="option-card" onclick="selectQuality(this,'organic')">
<div class="badge">⭐ POPULAR</div>🌱 Organic</div>
<div class="option-card" onclick="selectQuality(this,'premium')">
<div class="badge premium-badge">🔥 BEST</div>💎 Premium</div>
`;

selectedQuality="organic";
}

function selectQuality(el,q){
document.querySelectorAll(".option-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");

selectedQuality=q;
calculatePrice();

let fx=document.createElement("div");
fx.className="sparkle";
el.appendChild(fx);
setTimeout(()=>fx.remove(),500);
}

function calculatePrice(){
let type=document.getElementById("type").value;
let qty=document.getElementById("quantity").value;

if(!type||!qty){
price.innerText="💰 Total: 0";
return;
}

let base=basePrices[selectedPlatform]?.[type]?.[selectedQuality];
if(!base)return;

let total=(qty/1000)*base;
price.innerText=`💰 ${Math.round(total)} ${currency}`;
}

function confirmOrder(){
let type=document.getElementById("type").value;
let link=document.getElementById("link").value;
let qty=document.getElementById("quantity").value;

let msg=`🚀 ORDER
Platform:${selectedPlatform}
Service:${type}
Package:${selectedQuality}
Qty:${qty}
${price.innerText}
Link:${link}`;

window.open(`https://wa.me/256740421134?text=${encodeURIComponent(msg)}`);
}

/* LIVE USERS */
setInterval(()=>{
liveUsers.innerText=`👥 ${Math.floor(Math.random()*30)+20} users online`;
},4000);

/* FAKE ORDERS */
let nums=["+256***78","+254***21","+234***44"];
setInterval(()=>{
topBar.innerText=`📲 ${nums[Math.floor(Math.random()*nums.length)]} ordered`;
},5000);

/* REF */
refCode.innerText="ASH"+Math.floor(Math.random()*999999);

function shareReferral(){
window.open(`https://wa.me/?text=Join Ashmediaboost`);
}

function scrollToOrder(){
orderSection.scrollIntoView({behavior:"smooth"});
}

function openWhatsApp(){
window.open("https://wa.me/256740421134");
  }
