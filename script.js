// LOADER
window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.getElementById("loader").style.display="none";
  },2000);
});

// PRICING
const basePrices = {
  instagram: {
    followers: { starter: 5000, refill: 10000, premium: 20000 },
    likes: { starter: 3000, refill: 6000, premium: 9000 },
    views: { starter: 500, refill: 2000, premium: 3500 },
    comments: { starter: 5000, refill: 10000, premium: 15000 }
  },
  tiktok: {
    followers: { starter: 4000, refill: 9000, premium: 18000 },
    likes: { starter: 2500, refill: 5000, premium: 8000 },
    views: { starter: 400, refill: 1500, premium: 3000 },
    comments: { starter: 4000, refill: 9000, premium: 14000 }
  },
  youtube: {
    views: { starter: 500, refill: 2000, premium: 4000 },
    likes: { starter: 3000, refill: 6000, premium: 9000 }
  }
};

let selectedQuality = "refill";

function updateServiceOptions() {
  let type = document.getElementById("type").value;
  let box = document.getElementById("serviceOptions");

  if (!type) return box.innerHTML = "";

  box.innerHTML = `
    <div class="option-box" onclick="selectOption(this,'starter')">Starter</div>
    <div class="option-box active" onclick="selectOption(this,'refill')">Refill ⭐</div>
    <div class="option-box" onclick="selectOption(this,'premium')">Premium</div>
  `;

  selectedQuality = "refill";
  calculatePrice();
}

function selectOption(el, quality) {
  document.querySelectorAll(".option-box").forEach(e => e.classList.remove("active"));
  el.classList.add("active");
  selectedQuality = quality;
  calculatePrice();
}

function calculatePrice() {
  let platform = document.getElementById("platform").value;
  let type = document.getElementById("type").value;
  let qty = document.getElementById("quantity").value;

  if (!qty || !type) return;

  let base = basePrices[platform]?.[type]?.[selectedQuality];
  if (!base) return;

  let total = (qty / 1000) * base;
  total = Math.round(total * 0.97);

  document.getElementById("price").innerText = "Total: " + total + " UGX 🔥";
}

document.querySelectorAll("select, input").forEach(el => {
  el.addEventListener("input", calculatePrice);
});

function placeOrder() {
  let platform = document.getElementById("platform").value;
  let type = document.getElementById("type").value;
  let link = document.getElementById("link").value;
  let qty = document.getElementById("quantity").value;
  let price = document.getElementById("price").innerText;

  let msg = `🔥 *ASHMEDIABOOST ORDER*

📱 Platform: ${platform}
📊 Service: ${type}
💎 Quality: ${selectedQuality}

🔗 Link: ${link}
🔢 Quantity: ${qty}

💰 ${price}

Reply YES to confirm 🚀`;

  window.open(`https://wa.me/256740421134?text=${encodeURIComponent(msg)}`);
}

function confirmOrder(){
  if(confirm("Proceed to WhatsApp order?")){
    placeOrder();
  }
}

// FAKE ORDERS WITH NUMBERS
setInterval(() => {
  let names = ["Ashim","Brian","Kelvin","Aisha","Fatima","Kevin","Daniel"];
  let services = ["1K followers","5K views","2K likes"];
  let countries = ["🇺🇬","🇰🇪","🇬🇧"];

  let number = "+256 7" + Math.floor(10000000 + Math.random() * 90000000);

  let bar = document.getElementById("topBar");

  bar.innerText =
    `${countries[Math.random()*countries.length|0]} ${names[Math.random()*names.length|0]} (${number}) made an order via WhatsApp (${services[Math.random()*services.length|0]}) 🔥`;

  bar.style.display = "block";

  setTimeout(()=>bar.style.display="none",3000);
},5000);

// LIVE USERS
setInterval(()=>{
  let n=Math.floor(Math.random()*30)+20;
  document.getElementById("liveUsers").innerText=`👥 ${n} users ordering now`;
  document.getElementById("liveSlide").innerText=`👥 ${n} users placing orders right now 🔥`;
},4000);
