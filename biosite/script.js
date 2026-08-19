document.getElementById("year").textContent=new Date().getFullYear();
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.style.animationPlayState="running";io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll(".reveal").forEach(e=>{e.style.animationPlayState="paused";io.observe(e)});
document.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{if(navigator.vibrate)navigator.vibrate(8)}));
