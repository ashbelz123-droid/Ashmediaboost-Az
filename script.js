let currency="UGX";
let selectedPlatform="instagram";
let selectedQuality="organic";

const multipliers={UGX:1,KES:0.05,TZS:0.0025,RWF:0.015,BIF:0.003,NGN:0.25,ZAR:0.012,GHS:0.02,EGP:0.016,USD:0.001,EUR:0.0009,GBP:0.0008};

const basePrices={
instagram:{followers:{starter:8000,organic:15000,premium:30000}},
tiktok:{followers:{starter:7000,organic:13000,premium:28000}},
facebook:{followers:{starter:7000,organic:12000,premium:25000}},
youtube:{subscribers:{starter:15000,organic:25000,premium:40000}}
};

function calculatePrice(){
let type=document.getElementById("type").value;
let qty=document.getElementById("quantity").value;
if(!type||!qty)return;
let base=basePrices[selectedPlatform]?.[type]?.[selectedQuality];
let total=(qty/1000)*base;
let final=total*multipliers[currency];
document.getElementById("price").innerText=`💰 ${Math.round(final)} ${currency}`;
}

function selectPlatform(el,p){
document.querySelectorAll(".platform-card").forEach(e=>e.classList.remove("active"));
el.classList.add("active");
selectedPlatform=p;
}

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

function confirmOrder(){
let link=document.getElementById("link").value;
if(!link.startsWith("http")){
document.getElementById("linkError").innerText="Invalid link";
return;
}
window.open(`https://wa.me/256740421134?text=${encodeURIComponent("ORDER "+link)}`);
}

/* FAKE POPUP */
function showPopup(){
let names=["+256","+254","+234","+255"];
let p=["Instagram","TikTok","Facebook"];
let div=document.createElement("div");
div.className="popup";
div.innerText=`${names[Math.floor(Math.random()*names.length)]} just bought followers on ${p[Math.floor(Math.random()*p.length)]}`;
document.getElementById("orderPopup").appendChild(div);
setTimeout(()=>div.remove(),4000);
}
setInterval(showPopup,5000);

/* GEO */
fetch("https://ipapi.co/json/")
.then(r=>r.json())
.then(d=>{
let map={UG:"UGX",KE:"KES",NG:"NGN",US:"USD"};
currency=map[d.country]||"USD";
document.getElementById("currency").value=currency;
});

function changeCurrency(){currency=document.getElementById("currency").value;calculatePrice();}
function scrollToOrder(){document.getElementById("orderSection").scrollIntoView();}
function openWhatsApp(){window.open("https://wa.me/256740421134");}
