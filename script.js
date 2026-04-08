const price=document.getElementById("price");

let selectedPlatform="instagram";
let selectedQuality="organic";
let currency="UGX";

/* MULTIPLIERS */
const multipliers={
UGX:1,
KES:0.05,TZS:0.0025,RWF:0.015,BIF:0.003,
NGN:0.25,ZAR:0.012,GHS:0.02,EGP:0.016,
USD:0.001,EUR:0.0009,GBP:0.0008
};

/* BASE PRICES */
const basePrices={
instagram:{followers:{starter:8000,organic:15000,premium:30000}},
tiktok:{followers:{starter:7000,organic:13000,premium:28000}},
facebook:{followers:{starter:7000,organic:12000,premium:25000}},
youtube:{subscribers:{starter:15000,organic:25000,premium:40000}}
};

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
<div class="option-card" onclick="selectQuality(this,'starter')">⚡ Starter</div>
<div class="option-card" onclick="selectQuality(this,'organic')">
<div class="badge">⭐ POPULAR</div>🌱 Organic</div>
<div class="option-card" onclick="selectQuality(this,'premium')">
<div class="badge premium-badge">🔥 BEST</div>💎 Premium</div>
`;

selectedQuality="organic";
}

/* QUALITY */
function selectQuality(el,q){
document.querySelectorAll(".option-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedQuality=q;
calculatePrice();
}

/* PRICE */
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
let final=total*multipliers[currency];

price.innerText=`💰 ${Math.round(final)} ${currency}`;
}

/* CHANGE CURRENCY */
function changeCurrency(){
currency=document.getElementById("currency").value;
calculatePrice();
}

/* GEO DETECT */
async function detectUserCountry(){
try{
let res=await fetch("https://ipapi.co/json/");
let data=await res.json();

const map={
UG:"UGX",KE:"KES",TZ:"TZS",RW:"RWF",BI:"BIF",
NG:"NGN",ZA:"ZAR",GH:"GHS",EG:"EGP",
US:"USD",GB:"GBP",FR:"EUR",DE:"EUR"
};

let c=map[data.country]||"USD";
currency=c;
document.getElementById("currency").value=c;

calculatePrice();

}catch{}
}
detectUserCountry();

/* LINK VALIDATION */
function isValidLink(link){
return link.startsWith("http");
}

/* ORDER */
function confirmOrder(){
let type=document.getElementById("type").value;
let link=document.getElementById("link").value;
let qty=document.getElementById("quantity").value;

if(!type||!link||!qty){
alert("Fill all fields");
return;
}

if(!isValidLink(link)){
document.getElementById("linkError").innerText="Invalid link";
return;
}

let msg=`🚀 ORDER
Platform:${selectedPlatform}
Service:${type}
Package:${selectedQuality}
Qty:${qty}
${price.innerText}
Link:${link}`;

window.open(`https://wa.me/256740421134?text=${encodeURIComponent(msg)}`);
}

/* REF */
let ref=localStorage.getItem("ref")||("ASH"+Math.floor(Math.random()*999999));
localStorage.setItem("ref",ref);
document.getElementById("refCode").innerText=ref;

function shareReferral(){
let link="https://ashmediaboost-az.vercel.app/?ref="+ref;
let msg=`Join Ashmediaboost 🚀 ${link}`;
window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
}

/* SCROLL */
function scrollToOrder(){
orderSection.scrollIntoView({behavior:"smooth"});
}

/* WHATSAPP */
function openWhatsApp(){
window.open("https://wa.me/256740421134");
}
