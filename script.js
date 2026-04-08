setTimeout(()=>loader.style.display="none",1200);

let selectedPlatform="instagram";
let selectedQuality="organic";
let currency="UGX";

const rates={UGX:1,KES:0.035,NGN:0.2,USD:0.00027};

const basePrices={
instagram:{followers:{starter:8000,organic:12000,premium:25000}},
tiktok:{followers:{starter:7000,organic:10000,premium:22000}},
facebook:{followers:{starter:7000,organic:9000,premium:18000}},
youtube:{followers:{starter:10000,organic:18000,premium:35000}}
};

function selectPlatform(el,p){
document.querySelectorAll(".platform-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedPlatform=p;
calculatePrice();
}

function updateServiceOptions(){
let box=document.getElementById("serviceOptions");

box.innerHTML=`
<div class="option-card" onclick="selectQuality('starter')">⚡ Starter Boost</div>
<div class="option-card" onclick="selectQuality('organic')">🌱 Organic Lift ⭐</div>
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

let base=basePrices[selectedPlatform]?.[type]?.[selectedQuality];
if(!base||!qty)return;

let total=(qty/1000)*base;
let converted=total*rates[currency];

document.getElementById("price").innerText="💰 "+Math.round(converted)+" "+currency;
}

function changeCurrency(){
currency=document.getElementById("currency").value;
calculatePrice();
}

function confirmOrder(){
let link=document.getElementById("link").value;
let qty=document.getElementById("quantity").value;
let price=document.getElementById("price").innerText;

let msg=`🔥 ORDER

Platform:${selectedPlatform}
Qty:${qty}
${price}
Link:${link}

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
topBar.innerText=`📲 ${nums[Math.floor(Math.random()*nums.length)]} just placed an order`;
},5000);

/* REF */
let ref="ASH"+Math.floor(Math.random()*999999);
document.getElementById("refCode").innerText=ref;

function shareReferral(){
let link=location.origin+"?ref="+ref;
window.open(`https://wa.me/?text=${encodeURIComponent(link)}`);
                 }
