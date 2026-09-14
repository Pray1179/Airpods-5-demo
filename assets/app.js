/* ============================================================
   AirPods 5 — Concept Store
   Shared setup & interactions
   Motion.js for homepage, GSAP for detail pages
   ============================================================ */

// Detect if this is the homepage
const isHomepage = window.location.pathname.endsWith("index.html") ||
                   window.location.pathname.endsWith("/") ||
                   window.location.pathname === "";

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) { document.body.dataset.reduced = "1"; }

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  let menuOpen = false;

  function closeMenu() {
    menuOpen = false;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onMenuKey);
  }

  function openMenu() {
    menuOpen = true;
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onMenuKey);
  }

  function onMenuKey(e) {
    if (e.key === "Escape") closeMenu();
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menuOpen ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------- License panel ---------- */
  const licenseToggle = document.getElementById("licenseToggle");
  const licensePanel = document.getElementById("licensePanel");
  if (licenseToggle && licensePanel) {
    licenseToggle.addEventListener("click", () => {
      const open = licensePanel.classList.toggle("open");
      licenseToggle.setAttribute("aria-expanded", open);
      licenseToggle.textContent = open ? "Hide license" : "Show license (MIT)";
      licensePanel.setAttribute("aria-hidden", !open);
    });
  }

  /* ---------- Highlights controls ----------
     The rail is no longer a horizontal scroller: it is a row of expanding tabs
     that auto-cycles. Index.html's inline Motion script owns prev/next + cycling,
     so nothing to bind here (the tiles only exist on the homepage). */

  /* ---------- Video slots (YouTube embed) ---------- */
  document.querySelectorAll(".video-slot[data-video]").forEach((slot) => {
    const videoId = slot.dataset.video;
    if (!videoId) return;

    const autoplay = slot.dataset.autoplay === "muted";
    const embed = () => {
      if (slot.dataset.mounted === "1") return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&${autoplay ? "mute=1&" : ""}playsinline=1&rel=0&modestbranding=1`;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "autoplay; encrypted-media");
      iframe.setAttribute("allowfullscreen", "");
      iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:inherit;";
      slot.style.position = "relative";
      slot.innerHTML = "";
      slot.appendChild(iframe);
      slot.dataset.mounted = "1";
    };
    if (autoplay) embed();
    else {
      slot.addEventListener("click", embed);
      slot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); embed(); }
      });
    }
  });

  /* ---------- GSAP for detail pages ---------- */
  if (!isHomepage && window.gsap) {
    // Register plugins
    [window.ScrollTrigger, window.SplitText, window.ScrollToPlugin, window.Flip, window.Draggable]
      .filter(Boolean)
      .forEach((plugin) => window.gsap.registerPlugin(plugin));

    console.log("%cAirPods 5 demo — GSAP live (detail page)", "color:#2997ff;font-weight:bold;font-size:12px");

    /* Hero entrance — SplitText char reveal + parallax */
    const hTitle = document.querySelector(".hero .title");
    if (hTitle && window.SplitText) {
      const split = window.SplitText.create(hTitle, { type: "words, chars" });
      window.gsap.from(split.chars, {
        opacity: 0, y: 60, rotateX: -70, stagger: 0.028,
        duration: 1.1, ease: "power3.out", delay: 0.15,
      });
      const heroSub = document.querySelector(".hero .sub");
      heroSub && window.gsap.from(heroSub, { opacity: 0, y: 24, duration: 0.8, delay: 0.7, ease: "power2.out" });
      const heroCta = document.querySelector(".hero .cta");
      heroCta && window.gsap.from(heroCta.children, { opacity: 0, y: 20, stagger: 0.12, duration: 0.7, delay: 0.85, ease: "power2.out" });
    }

    /* Parallax + slow drift on hero art */
    const heroArt = document.querySelector(".hero-art");
    if (heroArt) {
      window.gsap.to(heroArt, {
        y: 60, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
      });
    }

    /* Scroll reveals */
    document.querySelectorAll(".reveal").forEach((el) => {
      window.gsap.from(el, {
        opacity: 0, y: 40, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      });
    });

    /* Sticky kinetic scenes */
    document.querySelectorAll(".sticky-scene").forEach((scene) => {
      const panels = scene.querySelectorAll(".sticky-panel");
      if (panels.length < 2) return;
      panels.forEach((panel, i) => {
        if (i === 0) return;
        window.gsap.from(panel, {
          opacity: 0, duration: 0.5,
          scrollTrigger: { trigger: panel, start: "top 90%", end: "top 50%", scrub: 1, pin: false }
        });
      });
    });

    /* Feature card expand */
    document.querySelectorAll(".feature-card").forEach((card) => {
      card.addEventListener("click", () => card.classList.toggle("open"));
    });

    /* Compare row toggles */
    document.querySelectorAll(".compare-table .row").forEach((row) => {
      row.addEventListener("click", () => row.classList.toggle("hl"));
    });
    const highlightAll = document.getElementById("highlightAll");
    if (highlightAll) {
      highlightAll.addEventListener("click", () => {
        const rows = document.querySelectorAll(".compare-table .row.flag");
        const allHighlighted = [...rows].every((r) => r.classList.contains("hl"));
        rows.forEach((r) => r.classList.toggle("hl", !allHighlighted));
        highlightAll.textContent = allHighlighted ? "Show all differences" : "Hide differences";
      });
    }

    /* Draggable artwork on model cards */
    document.querySelectorAll(".model-card .art").forEach((art) => {
      if (window.Draggable) {
        window.Draggable.create(art, {
          type: "x,y", bounds: art.parentElement,
          edgeResistance: 0.65, inertia: false,
          onDrag: function () { window.gsap.to(this.target, { rotation: this.x / 10, duration: 0.1 }); },
          onDragEnd: function () { window.gsap.to(this.target, { x: 0, y: 0, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }); }
        });
      }
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  console.log("%cAirPods 5 demo — animations live", "color:#2997ff;font-weight:bold;font-size:12px");
});
