// SPLASH + SOUND + VIBRATION
window.addEventListener("load",()=>{
setTimeout(()=>{
document.getElementById("splash").style.display="none";
playEffects();
},1500);
});

function playEffects(){
let s=document.getElementById("appSound");
s?.play().catch(()=>{});
navigator.vibrate && navigator.vibrate([100,50,100]);
}

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
<div class="option-card" onclick="selectOption(this,'starter')">Starter</div>
<div class="option-card active" onclick="selectOption(this,'refill')">Refill ⭐</div>
<div class="option-card" onclick="selectOption(this,'premium')">Premium</div>
`;
}

function selectOption(el,q){
document.querySelectorAll(".option-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedQuality=q;
calculatePrice();
}

// DYNAMIC PRICE
function calculatePrice(){
let type=document.getElementById("type").value;
let qty=document.getElementById("quantity").value;

let base=basePrices[selectedPlatform]?.[type]?.[selectedQuality];
if(!base||!qty)return;

let total=(qty/1000)*base;
document.getElementById("price").innerText="Total: "+Math.round(total)+" UGX";
}

document.getElementById("quantity").addEventListener("input",calculatePrice);

// WHATSAPP
function confirmOrder(){
let qty=document.getElementById("quantity").value;
if(qty<10){alert("Minimum is 10");return;}
placeOrder();
}

function placeOrder(){
let link=document.getElementById("link").value;
let qty=document.getElementById("quantity").value;

let msg=`🔥 ORDER\nPlatform:${selectedPlatform}\nQty:${qty}`;
window.location.href=`https://wa.me/256740421134?text=${encodeURIComponent(msg)}`;
}

// LIVE USERS
setInterval(()=>{
let n=Math.floor(Math.random()*30)+20;
document.getElementById("liveUsers").innerText=`👥 ${n} users ordering`;
},4000);

// FAKE ORDERS
let numbers=["+256701234567","+254712345678","+91 9876543210"];
let services=["followers","likes","views"];

function mask(n){return n.slice(0,6)+"****"+n.slice(-2);}

setInterval(()=>{
let num=mask(numbers[Math.random()*numbers.length|0]);
let service=services[Math.random()*services.length|0];

let bar=document.getElementById("topBar");
bar.innerText=`📲 ${num} ordered ${service} via WhatsApp`;
bar.classList.add("show");

setTimeout(()=>bar.classList.remove("show"),4000);

},5000);

// INSTALL APP
let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{
e.preventDefault();
deferredPrompt=e;
document.getElementById("installBtn").style.display="block";
});

document.getElementById("installBtn").onclick=async()=>{
deferredPrompt.prompt();
};
