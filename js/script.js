document.addEventListener("DOMContentLoaded",()=>{
  const header=document.getElementById("header");
  const menuToggle=document.getElementById("menuToggle");
  const navMenu=document.getElementById("navMenu");
  const navLinks=document.querySelectorAll(".nav-menu a");
  const sections=document.querySelectorAll("main section[id]");
  const reveal=document.querySelectorAll(".reveal");
  const form=document.getElementById("contactForm");
  const formMessage=document.getElementById("formMessage");
  const year=document.getElementById("year");
  if(year) year.textContent=new Date().getFullYear();

  const onScroll=()=>header.classList.toggle("scrolled",window.scrollY>25);
  onScroll(); window.addEventListener("scroll",onScroll,{passive:true});

  if(menuToggle){
    menuToggle.addEventListener("click",()=>{
      const open=navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded",String(open));
    });
  }
  navLinks.forEach(a=>a.addEventListener("click",()=>{
    navMenu.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded","false");
  }));

  if("IntersectionObserver" in window){
    const ro=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ro.unobserve(e.target)}});
    },{threshold:.08});
    reveal.forEach(el=>ro.observe(el));

    const so=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          navLinks.forEach(a=>a.classList.remove("active"));
          const active=document.querySelector(`.nav-menu a[href="#${e.target.id}"]`);
          active?.classList.add("active");
        }
      });
    },{rootMargin:"-40% 0px -50% 0px"});
    sections.forEach(s=>so.observe(s));
  }else reveal.forEach(el=>el.classList.add("visible"));

  // Duplicación del carrusel para un desplazamiento continuo.
  const track=document.getElementById("clientsTrack");
  if(track){
    const masters=[...track.querySelectorAll('[data-master="true"]')];
    masters.forEach(item=>{
      const clone=item.cloneNode(true);
      clone.removeAttribute("data-master");
      clone.setAttribute("aria-hidden","true");
      clone.querySelector("img")?.setAttribute("alt","");
      track.appendChild(clone);
    });
    const addMore=()=>{
      while(track.scrollWidth < window.innerWidth*2.4){
        masters.forEach(item=>{
          const clone=item.cloneNode(true);
          clone.removeAttribute("data-master");
          clone.setAttribute("aria-hidden","true");
          clone.querySelector("img")?.setAttribute("alt","");
          track.appendChild(clone);
        });
      }
      const firstSet=track.children[masters.length];
      if(firstSet){
        const distance=firstSet.offsetLeft-track.children[0].offsetLeft;
        track.style.setProperty("--clients-shift",`${distance}px`);
      }
    };
    addMore();
    window.addEventListener("resize",addMore);
  }

  if(form){
    form.addEventListener("submit",async e=>{
      e.preventDefault();
      const btn=form.querySelector(".form-submit");
      const name=new FormData(form).get("nombre");
      btn.disabled=true;
      formMessage.textContent="Enviando tu solicitud...";
      formMessage.classList.remove("form-error");
      try{
        const response=await fetch(form.action,{method:"POST",headers:{Accept:"application/json"},body:new FormData(form)});
        if(!response.ok) throw new Error("No se pudo enviar");
        form.reset();
        formMessage.textContent=`Gracias${name?`, ${name}`:""}. Tu solicitud fue enviada correctamente.`;
      }catch(err){
        formMessage.textContent="No pudimos enviar la solicitud. Escríbenos por WhatsApp o correo.";
        formMessage.classList.add("form-error");
      }finally{
        btn.disabled=false;
        setTimeout(()=>{formMessage.textContent="";formMessage.classList.remove("form-error")},6500);
      }
    });
  }
});