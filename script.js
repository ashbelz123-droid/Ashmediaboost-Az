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
    <div class="option-box" onclick="selectOption(this,'starter')">
      ⚡ Starter<br><small>Fast & cheap</small>
    </div>

    <div class="option-box active" onclick="selectOption(this,'refill')">
      🔄 Refill <span class="best">⭐ Most Popular</span><br>
      <small>Stable & safe</small>
    </div>

    <div class="option-box" onclick="selectOption(this,'premium')">
      💎 Premium<br><small>High quality</small>
    </div>
  `;
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

  let base = basePrices[platform][type]?.[selectedQuality];
  if (!base) return;

  let total = (qty / 1000) * base;
  document.getElementById("price").innerText = "Total: " + Math.round(total) + " UGX";
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

  if (!link || !qty || !type) {
    alert("Fill all fields");
    return;
  }

  let msg = `🔥 NEW ORDER

Platform: ${platform}
Service: ${type}
Quality: ${selectedQuality}

Link: ${link}
Quantity: ${qty}

${price}`;

  window.open(`https://wa.me/256749421134?text=${encodeURIComponent(msg)}`);
}

function scrollToOrder() {
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

/* LIVE USERS */
setInterval(() => {
  let n = Math.floor(Math.random()*20)+15;
  document.getElementById("liveUsers").innerText =
    `👥 ${n} users placing orders`;
}, 4000);

/* POPUPS */
setInterval(() => {
  let names = ["Alex","John","Emma","David"];
  let services = ["Followers","Views","Likes"];

  let popup = document.getElementById("popup");
  popup.innerText =
    `${names[Math.random()*names.length|0]} bought ${services[Math.random()*services.length|0]}`;

  popup.style.display = "block";
  setTimeout(()=>popup.style.display="none",3000);
}, 6000);
