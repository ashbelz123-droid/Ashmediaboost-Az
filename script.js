// LOADER
window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.getElementById("loader").style.display="none";
  },1500);
});

// PRICING
const basePrices = {
  instagram:{
    followers:{starter:5000,refill:10000,premium:20000},
    likes:{starter:3000,refill:6000,premium:9000},
    views:{starter:500,refill:2000,premium:3500},
    comments:{starter:5000,refill:10000,premium:15000}
  },
  tiktok:{
    followers:{starter:4000,refill:9000,premium:18000},
    likes:{starter:2500,refill:5000,premium:8000},
    views:{starter:400,refill:1500,premium:3000},
    comments:{starter:4000,refill:9000,premium:14000}
  },
  facebook:{
    followers:{starter:3000,refill:7000,premium:15000},
    likes:{starter:2000,refill:5000,premium:8000},
    views:{starter:300,refill:1200,premium:2500},
    comments:{starter:3000,refill:7000,premium:12000}
  },
  youtube:{
    views:{starter:500,refill:2000,premium:4000},
    likes:{starter:3000,refill:6000,premium:9000},
    subscribers:{starter:8000,refill:15000,premium:30000}
  }
};

let selectedQuality="refill";

function updateServiceOptions(){
  let type=document.getElementById("type").value;
  let platform=document.getElementById("platform").value;
  let box=document.getElementById("serviceOptions");

  if(!type) return box.innerHTML="";

  if(!basePrices[platform][type]){
    box.innerHTML="❌ Not available";
    return;
  }

  box.innerHTML=`
  <div class="option-box" onclick="selectOption(this,'starter')">Starter</div>
  <div class="option-box active" onclick="selectOption(this,'refill')">Refill ⭐</div>
  <div class="option-box" onclick="selectOption(this,'premium')">Premium</div>
  `;

  calculatePrice();
}

function selectOption(el,q){
  document.querySelectorAll(".option-box").forEach(e=>e.classList.remove("active"));
  el.classList.add("active");
  selectedQuality=q;
  calculatePrice();
}

function calculatePrice(){
  let p=document.getElementById("platform").value;
  let t=document.getElementById("type").value;
  let q=document.getElementById("quantity").value;

  let base=basePrices[p]?.[t]?.[selectedQuality];
  if(!base || !q) return;

  let total=Math.round((q/1000)*base);
  document.getElementById("price").innerText=`Total: ${total} UGX`;
}

// EVENTS
document.querySelectorAll("select,input").forEach(el=>{
  el.addEventListener("input",calculatePrice);
});

// WHATSAPP
function openWhatsApp(){
  let phone="256740421134";
  let msg="Hello Ashmediaboost 🚀";
  let enc=encodeURIComponent(msg);

  window.location.href=`whatsapp://send?phone=${phone}&text=${enc}`;
  setTimeout(()=>{
    window.location.href=`https://api.whatsapp.com/send?phone=${phone}&text=${enc}`;
  },1500);
}

function placeOrder(){
  let link=document.getElementById("link").value;
  let qty=document.getElementById("quantity").value;
  let price=document.getElementById("price").innerText;

  let msg=`🔥 ASHMEDIABOOST ORDER

Link: ${link}
Qty: ${qty}
${price}

Reply YES 🚀`;

  let enc=encodeURIComponent(msg);
  let phone="256740421134";

  window.location.href=`whatsapp://send?phone=${phone}&text=${enc}`;
  setTimeout(()=>{
    window.location.href=`https://api.whatsapp.com/send?phone=${phone}&text=${enc}`;
  },1500);
}

function confirmOrder(){
  if(confirm("Proceed to WhatsApp?")){
    placeOrder();
  }
}

// 🔥 SMOOTH TOP BAR
setInterval(()=>{
  let names=["Ashim","Brian","Aisha","Kevin"];
  let services=["1K followers","5K views","2K likes"];
  let num="+2567"+Math.floor(10000000+Math.random()*90000000);

  let bar=document.getElementById("topBar");

  bar.innerText=`${names[Math.random()*names.length|0]} (${num}) ordered via WhatsApp (${services[Math.random()*services.length|0]})`;

  bar.classList.add("show");

  setTimeout(()=>{
    bar.classList.remove("show");
  },3000);

},5000);

// LIVE USERS
setInterval(()=>{
  let n=Math.floor(Math.random()*30)+20;
  document.getElementById("liveUsers").innerText=`👥 ${n} users ordering now`;
  document.getElementById("liveSlide").innerText=`👥 ${n} users placing orders 🔥`;
},4000);
