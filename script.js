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

function calculatePrice() {
  let platform = document.getElementById("platform").value;
  let type = document.getElementById("type").value;
  let quality = document.getElementById("quality").value;
  let qty = document.getElementById("quantity").value;

  if (!qty) return;

  let base = basePrices[platform][type]?.[quality];
  if (!base) return;

  let total = (qty / 1000) * base;

  document.getElementById("price").innerText =
    "Total: " + Math.round(total) + " UGX";
}

document.querySelectorAll("select, input").forEach(el => {
  el.addEventListener("input", calculatePrice);
});

function placeOrder() {
  let platform = document.getElementById("platform").value;
  let type = document.getElementById("type").value;
  let quality = document.getElementById("quality").value;
  let link = document.getElementById("link").value;
  let qty = document.getElementById("quantity").value;
  let price = document.getElementById("price").innerText;

  if (!link || !qty) {
    alert("Please fill all fields");
    return;
  }

  let msg = `🔥 *NEW ORDER REQUEST*

📱 Platform: ${platform}
📊 Service: ${type}
⭐ Quality: ${quality}

🔗 Link: ${link}
🔢 Quantity: ${qty}

💰 ${price}

-------------------------
⚠️ Awaiting payment instructions`;

  window.open(`https://wa.me/256749421134?text=${encodeURIComponent(msg)}`);
}

function scrollToOrder() {
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

function contactWhatsApp() {
  window.open("https://wa.me/256749421134");
    }
