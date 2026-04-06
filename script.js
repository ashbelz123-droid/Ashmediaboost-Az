// LOADER
setTimeout(()=>document.getElementById("loader").style.display="none",1500);

// PLATFORM
let selectedPlatform="instagram";
function selectPlatform(el,p){
document.querySelectorAll(".platform-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedPlatform=p;
}

// PRICING
const basePrices={
instagram:{followers:{starter:5000,refill:10000,premium:20000}},
tiktok:{followers:{starter:4000,refill:9000,premium:18000}},
facebook:{followers:{starter:3000,refill:7000,premium:15000}},
youtube:{views:{starter:500,refill:2000,premium:4000}}
};

let selectedQuality="refill";

function updateServiceOptions(){
let type=document.getElementById("type").value;
let box=document.getElementById("serviceOptions");

if(!basePrices[selectedPlatform][type]){
box.innerHTML="Not available";
return;
}

box.innerHTML=`
<div onclick="selectedQuality='starter';calculatePrice()">Starter</div>
<div onclick="selectedQuality='refill';calculatePrice()">Refill</div>
<div onclick="selectedQuality='premium';calculatePrice()">Premium</div>
`;
}

function calculatePrice(){
let type=document.getElementById("type").value;
let qty=document.getElementById("quantity").value;
let base=basePrices[selectedPlatform]?.[type]?.[selectedQuality];
if(!base||!qty)return;
document.getElementById("price").innerText="Total: "+Math.round(qty/1000*base)+" UGX";
}

// REF CODE
let refCode=localStorage.getItem("refCode")||("ASH"+Math.floor(Math.random()*999999));
localStorage.setItem("refCode",refCode);
document.getElementById("refCode").innerText=refCode;

const params=new URLSearchParams(window.location.search);
const incomingRef=params.get("ref");

if(incomingRef){
document.getElementById("refNotice").innerText="🎁 Referral bonus applied!";
}

// PROGRESS
let orderCount=localStorage.getItem("orders")||0;
function confirmOrder(){
if(confirm("Proceed to WhatsApp?")){
orderCount++;
localStorage.setItem("orders",orderCount);
document.getElementById("progress").innerText=`🏆 Your Progress: ${orderCount}/7 orders`;
placeOrder();
}
}

// WHATSAPP
function placeOrder(){
let link=document.getElementById("link").value;
let qty=document.getElementById("quantity").value;
let price=document.getElementById("price").innerText;

let msg=`🔥 ORDER

Link:${link}
Qty:${qty}
${price}

Referral:${incomingRef||"None"}`;

let enc=encodeURIComponent(msg);
window.location.href=`https://wa.me/256740421134?text=${enc}`;
}

// SHARE
function shareReferral(){
let link=window.location.origin+"?ref="+refCode;
let msg=`Join Ashmediaboost 🚀 ${link}`;
window.location.href=`https://wa.me/?text=${encodeURIComponent(msg)}`;
}

// LIVE USERS
setInterval(()=>{
let n=Math.floor(Math.random()*30)+20;
document.getElementById("liveUsers").innerText=`👥 ${n} users ordering`;
},4000);

// WINNERS (1–5 DAILY)
let names=["Brian","Aisha","Kevin","Fatima","Daniel","John","Emma"];
let count=Math.floor(Math.random()*5)+1;
let winners=names.sort(()=>0.5-Math.random()).slice(0,count);
let i=0;

setInterval(()=>{
if(i>=winners.length)return;
let bar=document.getElementById("topBar");
bar.innerText=`🏆 ${winners[i]} completed 7 orders & WON reward 🎁`;
bar.classList.add("show");
setTimeout(()=>bar.classList.remove("show"),4000);
i++;
},15000);
