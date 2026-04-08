let currency="UGX";
let selectedPlatform="instagram";
let selectedQuality="organic";

/* PRICES */
const basePrices={
instagram:{followers:{starter:8000,organic:15000,premium:30000}},
tiktok:{followers:{starter:7000,organic:13000,premium:28000}}
};

const multipliers={UGX:1,KES:0.05,NGN:0.25,USD:0.001};

/* LOADER FIX */
window.addEventListener("load", ()=>{

let loader=document.getElementById("loader");
let rocket=document.getElementById("rocket");

setTimeout(()=>rocket.classList.add("launch"),300);

setTimeout(()=>{
loader.style.opacity="0";
setTimeout(()=>loader.style.display="none",500);
},1200);

/* fallback */
setTimeout(()=>loader.style.display="none",3000);

});

/* PRICE */
function calculatePrice(){
let qty=document.getElementById("quantity").value;
let type=document.getElementById("type").value;
if(!qty||!type)return;

let base=basePrices[selectedPlatform][type][selectedQuality];
let total=(qty/1000)*base*multipliers[currency];

document.getElementById("price").innerText=`💰 ${Math.round(total)} ${currency}`;
}

/* OPTIONS */
function updateServiceOptions(){
document.getElementById("serviceOptions").innerHTML=`
<div class="option-card" onclick="selectQuality(this,'starter')">⚡ Starter</div>
<div class="option-card active" onclick="selectQuality(this,'organic')">⭐ Organic</div>
<div class="option-card" onclick="selectQuality(this,'premium')">🔥 Premium</div>`;
}

function selectQuality(el,q){
document.querySelectorAll(".option-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedQuality=q;
calculatePrice();
}

/* PLATFORM */
function selectPlatform(el,p){
document.querySelectorAll(".platform-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedPlatform=p;
}

/* ORDER */
function confirmOrder(){
let link=document.getElementById("link").value;
if(!link.startsWith("http")){
document.getElementById("linkError").innerText="Invalid link";
return;
}
window.open(`https://wa.me/256740421134?text=${encodeURIComponent(link)}`);
}

/* POPUP */
setInterval(()=>{
let div=document.createElement("div");
div.className="popup";
div.innerText="+256 user bought followers";
document.getElementById("orderPopup").appendChild(div);
setTimeout(()=>div.remove(),3000);
},5000);

/* CURRENCY */
function changeCurrency(){
currency=document.getElementById("currency").value;
calculatePrice();
}

function scrollToOrder(){
document.getElementById("orderSection").scrollIntoView({behavior:"smooth"});
                               }
