const topBar=document.getElementById("topBar");
const liveUsers=document.getElementById("liveUsers");

setTimeout(()=>loader.style.display="none",1200);

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
box.innerHTML="<p>Not available</p>";
return;
}

box.innerHTML=`
<div class="option-card" onclick="selectQuality('starter')">⚡ Starter Boost</div>
<div class="option-card" onclick="selectQuality('organic')">🌱 Organic Growth ⭐</div>
<div class="option-card" onclick="selectQuality('premium')">💎 Premium Combo</div>
`;
}

function selectQuality(q){
selectedQuality=q;
calculatePrice();
}

function calculatePrice(){
let type=document.getElementById("type").value;
let qty=document.getElementById("quantity").value;

if(!type||!qty){
price.innerText="💰 Total: 0";
return;
}

let base=basePrices[selectedPlatform]?.[type]?.[selectedQuality];
if(!base){
price.innerText="Service not available";
return;
}

let total=(qty/1000)*base;
let converted=total*rates[currency];

price.innerText=`💰 ${Math.round(converted)} ${currency}`;
}

function changeCurrency(){
currency=document.getElementById("currency").value;
calculatePrice();
}

function confirmOrder(){
let type=document.getElementById("type").value;
let link=document.getElementById("link").value;
let qty=document.getElementById("quantity").value;

if(!type||!link||!qty){
alert("Fill all fields");
return;
}

let msg=`🚀 NEW ORDER

Platform:${selectedPlatform}
Service:${type}
Package:${selectedQuality}

Link:${link}
Qty:${qty}
${price.innerText}

Join Channel:
https://whatsapp.com/channel/0029VbCSFDCBadmaR5Memh16`;

window.open(`https://wa.me/256740421134?text=${encodeURIComponent(msg)}`);
}

function scrollToOrder(){
document.getElementById("orderSection").scrollIntoView({behavior:"smooth"});
}

function openWhatsApp(){
window.open("https://wa.me/256740421134");
}

/* LIVE USERS */
setInterval(()=>{
let n=Math.floor(Math.random()*30)+20;
liveUsers.innerText=`👥 ${n} users online`;
},4000);

/* FAKE ORDERS */
let nums=["+256***78","+254***21","+234***44","+27***55"];
setInterval(()=>{
topBar.innerText=`📲 ${nums[Math.floor(Math.random()*nums.length)]} just ordered`;
},5000);

/* REF */
let ref="ASH"+Math.floor(Math.random()*999999);
refCode.innerText=ref;

function shareReferral(){
let link=location.origin+"?ref="+ref;
window.open(`https://wa.me/?text=${encodeURIComponent(link)}`);
}
