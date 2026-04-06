// LOADER
setTimeout(()=>document.getElementById("loader").style.display="none",1500);

// PLATFORM
let selectedPlatform="instagram";

function selectPlatform(el,p){
document.querySelectorAll(".platform-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedPlatform=p;
updatePreview();
}

// PRICES (YOUR VALUES)
const basePrices={
instagram:{views:500,likes:3000,followers:5000},
tiktok:{views:400,likes:2500,followers:7000},
youtube:{views:1200,likes:4000,subscribers:18000},
facebook:{views:800,likes:3000,followers:6500}
};

// SHOW PRICE PREVIEW
function updatePreview(){
let p=basePrices[selectedPlatform];
let html=``;

for(let key in p){
html+=`<p>${key} → from ${p[key]} UGX</p>`;
}

document.getElementById("pricePreview").innerHTML=html;
}
updatePreview();

// SERVICE OPTIONS
let selectedQuality="refill";

function updateServiceOptions(){
let type=document.getElementById("type").value;
let box=document.getElementById("serviceOptions");

if(!type){box.innerHTML="";return;}

box.innerHTML=`
<div class="option-card active" onclick="selectOption(this,'starter')">Starter</div>
<div class="option-card" onclick="selectOption(this,'refill')">Refill ⭐</div>
<div class="option-card" onclick="selectOption(this,'premium')">Premium</div>
`;
}

function selectOption(el,q){
document.querySelectorAll(".option-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedQuality=q;
calculatePrice();
}

// CALCULATE
function calculatePrice(){
let type=document.getElementById("type").value;
let qty=document.getElementById("quantity").value;

let base=basePrices[selectedPlatform][type];
if(!base||!qty)return;

document.getElementById("price").innerText=
"Total: "+Math.round(qty/1000*base)+" UGX";
}

// REF
let refCode=localStorage.getItem("refCode")||("ASH"+Math.floor(Math.random()*999999));
localStorage.setItem("refCode",refCode);
document.getElementById("refCode").innerText=refCode;

const params=new URLSearchParams(window.location.search);
const incomingRef=params.get("ref");

if(incomingRef){
document.getElementById("refNotice").innerText="🎁 Bonus applied!";
}

// PROGRESS
let orders=localStorage.getItem("orders")||0;

function confirmOrder(){
orders++;
localStorage.setItem("orders",orders);
document.getElementById("progress").innerText=`🏆 ${orders}/7 orders`;
placeOrder();
}

// WHATSAPP
function placeOrder(){
let link=document.getElementById("link").value;
let qty=document.getElementById("quantity").value;

let msg=`🔥 ORDER

Platform:${selectedPlatform}
Qty:${qty}

Referral:${incomingRef||"None"}`;

window.open(`https://wa.me/256740421134?text=${encodeURIComponent(msg)}`);
}

// SHARE
function shareReferral(){
let link=location.origin+"?ref="+refCode;
window.open(`https://wa.me/?text=${encodeURIComponent(link)}`);
}

// LIVE USERS
setInterval(()=>{
let n=Math.floor(Math.random()*30)+20;
document.getElementById("liveUsers").innerText=`👥 ${n} users online`;
},4000);

// WINNERS (1–5)
let names=["Brian","Aisha","Kevin","Fatima","Daniel"];
let winners=names.sort(()=>0.5-Math.random()).slice(0,Math.floor(Math.random()*5)+1);
let i=0;

setInterval(()=>{
if(i>=winners.length)return;
let bar=document.getElementById("topBar");
bar.innerText=`🏆 ${winners[i]} hit 7 orders & won reward 🎁`;
bar.classList.add("show");
setTimeout(()=>bar.classList.remove("show"),4000);
i++;
},15000);

// SCROLL
function scrollToOrder(){
document.getElementById("order").scrollIntoView({behavior:"smooth"});
                                 }
