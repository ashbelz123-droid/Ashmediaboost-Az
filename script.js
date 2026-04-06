window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.getElementById("loader").style.display="none";
  },2000);
});

/* KEEP YOUR EXISTING LOGIC HERE */

/* TOP FAKE ORDER */
setInterval(()=>{
  let names=["Ash","John","Emma","David"];
  let services=["followers","likes","views"];

  let bar=document.getElementById("topBar");
  bar.innerText=`🔥 ${names[Math.random()*names.length|0]} ordered ${services[Math.random()*services.length|0]}`;
  bar.style.display="block";

  setTimeout(()=>bar.style.display="none",3000);
},5000);

/* LIVE USERS */
setInterval(()=>{
  let n=Math.floor(Math.random()*30)+20;
  document.getElementById("liveUsers").innerText=`👥 ${n} users ordering now`;
  document.getElementById("liveSlide").innerText=`👥 ${n} users placing orders right now 🔥`;
},4000);

/* CONFIRM */
function confirmOrder(){
  if(confirm("Proceed to WhatsApp order?")){
    placeOrder();
  }
}
