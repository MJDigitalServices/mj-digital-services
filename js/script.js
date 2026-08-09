document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll("main section[id]");
  const revealElements = document.querySelectorAll(".reveal");
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const year = document.getElementById("year");

  // Año automático
  if (year) year.textContent = new Date().getFullYear();

  // Header al hacer scroll
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Menú móvil
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Sección activa en navegación
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, {
    rootMargin: "-35% 0px -55% 0px"
  });

  sections.forEach(section => sectionObserver.observe(section));

  // Animaciones al entrar en pantalla
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(element => revealObserver.observe(element));

  // Formulario
  // Actualmente es una demostración front-end. Para recibir mensajes,
  // conecta este formulario posteriormente a Formspree, EmailJS o tu backend.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const nombre = data.get("nombre");

    formMessage.textContent =
      `Gracias${nombre ? `, ${nombre}` : ""}. Tu solicitud ha sido preparada correctamente.`;

    form.reset();

    setTimeout(() => {
      formMessage.textContent = "";
    }, 5000);
  });
  // Galerías de servicios
  // Puedes agregar más fotos a cada servicio usando el mismo formato:
  // { src: "img/proyectos/nueva-foto.jpg", title: "Título de la foto", caption: "Descripción" }
  const serviceGalleries = {
    1: {
      title: "Soporte y administración T.I.",
      description: "Trabajos de soporte, administración y acompañamiento tecnológico.",
      images: [
        { src: "img/proyectos/proyecto-06.png", title: "Soporte T.I.", caption: "Administración y acompañamiento de soluciones tecnológicas." }
      ]
    },
    2: {
      title: "Redes y cableado estructurado",
      description: "Proyectos de conectividad, cableado, racks y organización de infraestructura.",
      images: [
        { src: "img/proyectos/proyecto-01.jpg", title: "Cableado e infraestructura de red", caption: "Instalación y organización de infraestructura de conectividad." },
        { src: "img/proyectos/proyecto-05.jpg", title: "Rack y equipos de red", caption: "Organización de switches y puntos de conectividad." }
      ]
    },
    3: {
      title: "CCTV y videovigilancia",
      description: "Aquí podrás mostrar las instalaciones y proyectos de videovigilancia realizados.",
      images: []
    },
    4: {
      title: "Seguridad electrónica",
      description: "Aquí podrás mostrar instalaciones de alarmas, sensores y soluciones de seguridad.",
      images: []
    },
    5: {
      title: "Control de acceso y biometría",
      description: "Proyectos de control de acceso, biometría y administración de usuarios.",
      images: [
        { src: "img/proyectos/proyecto-03.png", title: "Control de acceso biométrico", caption: "Instalación de terminal biométrica para control de acceso." }
      ]
    },
    6: {
      title: "Infraestructura y soluciones T.I.",
      description: "Servidores, almacenamiento y demás infraestructura tecnológica.",
      images: [
        { src: "img/proyectos/proyecto-04.jpg", title: "Infraestructura de servidores", caption: "Infraestructura tecnológica para soportar los servicios de la organización." },
        { src: "img/proyectos/proyecto-02.png", title: "Soluciones tecnológicas", caption: "Soluciones digitales e infraestructura orientadas a la operación empresarial." }
      ]
    }
  };

  const galleryModal = document.getElementById("serviceGalleryModal");
  const galleryTitle = document.getElementById("galleryTitle");
  const galleryDescription = document.getElementById("galleryDescription");
  const galleryImage = document.getElementById("galleryImage");
  const galleryCaption = document.getElementById("galleryCaption");
  const galleryThumbs = document.getElementById("galleryThumbs");
  const galleryCards = document.querySelectorAll(".service-card[data-gallery]");
  const galleryPrev = document.querySelector(".gallery-prev");
  const galleryNext = document.querySelector(".gallery-next");
  let currentGallery = [];
  let currentGalleryIndex = 0;

  const showGalleryImage = (index) => {
    if (!currentGallery.length) return;
    currentGalleryIndex = (index + currentGallery.length) % currentGallery.length;
    const item = currentGallery[currentGalleryIndex];

    galleryImage.src = item.src;
    galleryImage.alt = item.title || "Proyecto Digital Services";
    galleryCaption.innerHTML = `<strong>${item.title || ""}</strong>${item.caption ? `<span>${item.caption}</span>` : ""}`;

    document.querySelectorAll(".gallery-thumb").forEach((thumb, i) => {
      thumb.classList.toggle("active", i === currentGalleryIndex);
    });
  };

  const openGallery = (serviceId) => {
    const gallery = serviceGalleries[serviceId];
    if (!gallery) return;

    galleryTitle.textContent = gallery.title;
    galleryDescription.textContent = gallery.description;
    currentGallery = gallery.images || [];
    currentGalleryIndex = 0;

    galleryThumbs.innerHTML = "";

    if (currentGallery.length) {
      currentGallery.forEach((item, index) => {
        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "gallery-thumb";
        thumb.innerHTML = `<img src="${item.src}" alt="${item.title || "Proyecto"}">`;
        thumb.addEventListener("click", () => showGalleryImage(index));
        galleryThumbs.appendChild(thumb);
      });
      showGalleryImage(0);
    } else {
      galleryImage.removeAttribute("src");
      galleryImage.alt = "";
      galleryCaption.innerHTML = `<strong>Próximamente</strong><span>Agrega aquí las fotografías reales de este tipo de proyecto.</span>`;
      galleryThumbs.innerHTML = `<div class="gallery-empty">Aún no hay fotografías cargadas para este servicio.</div>`;
    }

    const disabled = currentGallery.length <= 1;
    galleryPrev.disabled = disabled;
    galleryNext.disabled = disabled;

    galleryModal.classList.add("open");
    galleryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-open");
  };

  const closeGallery = () => {
    galleryModal.classList.remove("open");
    galleryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gallery-open");
  };

  // Enlace visible "Ver galería" dentro de cada tarjeta
  document.querySelectorAll(".gallery-link[data-open-gallery]").forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openGallery(link.dataset.openGallery);
    });
  });

  galleryCards.forEach(card => {
    card.addEventListener("click", (event) => {
      // El enlace "Más información" conserva su función hacia Contacto.
      if (event.target.closest("a")) return;
      openGallery(card.dataset.gallery);
    });

    card.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && !event.target.closest("a")) {
        event.preventDefault();
        openGallery(card.dataset.gallery);
      }
    });
  });

  galleryPrev.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  galleryNext.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  galleryModal.querySelectorAll("[data-gallery-close]").forEach(element => {
    element.addEventListener("click", closeGallery);
  });

  document.addEventListener("keydown", (event) => {
    if (!galleryModal.classList.contains("open")) return;
    if (event.key === "Escape") closeGallery();
    if (event.key === "ArrowLeft" && currentGallery.length > 1) showGalleryImage(currentGalleryIndex - 1);
    if (event.key === "ArrowRight" && currentGallery.length > 1) showGalleryImage(currentGalleryIndex + 1);
  });

});
