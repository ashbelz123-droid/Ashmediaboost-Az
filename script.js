setTimeout(()=>loader.style.display="none",1000);

let selectedPlatform="instagram";
let selectedQuality="organic";
let selectedCurrency="UGX";

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
}

function updateServiceOptions(){
let type=document.getElementById("type").value;

let box=document.getElementById("serviceOptions");

box.innerHTML=`
<div class="option-card" onclick="selectQuality('starter')">Starter Boost</div>
<div class="option-card" onclick="selectQuality('organic')">Organic Lift ⭐</div>
<div class="option-card" onclick="selectQuality('premium')">Premium Combo</div>
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
let converted=total*rates[selectedCurrency];

document.getElementById("price").innerText="💰 "+Math.round(converted)+" "+selectedCurrency;
}

function changeCurrency(){
selectedCurrency=document.getElementById("currency").value;
calculatePrice();
}

function confirmOrder(){
placeOrder();
}

function placeOrder(){
let link=document.getElementById("link").value;
let qty=document.getElementById("quantity").value;
let price=document.getElementById("price").innerText;

let msg=`🔥 ORDER

Platform:${selectedPlatform}
Qty:${qty}
${price}
Link:${link}`;

window.open(`https://wa.me/256740421134?text=${encodeURIComponent(msg)}`);
}

function scrollToOrder(){
document.getElementById("orderSection").scrollIntoView({behavior:"smooth"});
}

function openWhatsApp(){
window.open("https://wa.me/256740421134");
}

setInterval(()=>{
let n=Math.floor(Math.random()*30)+20;
liveUsers.innerText=`👥 ${n} users online`;
},4000);

let names=["+256***78","+254***21","+234***44"];
setInterval(()=>{
topBar.innerText=`📲 ${names[Math.floor(Math.random()*names.length)]} made an order`;
},6000);

let ref="ASH"+Math.floor(Math.random()*999999);
document.getElementById("refCode").innerText=ref;

function shareReferral(){
let link=location.origin+"?ref="+ref;
window.open(`https://wa.me/?text=${encodeURIComponent(link)}`);
  }
