// Segura & Co — interações do site (v2 — premium edition)

// ─── Motion / pointer preference detection ───────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

// ─── Bootstrap ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Enhancement 1: Preloader (skip entirely under reduced-motion)
  if (!prefersReducedMotion) {
    initPreloader();
  } else {
    // Remove preloader immediately so page is visible
    const pl = document.getElementById('preloader');
    if (pl) pl.remove();
    document.body.classList.remove('is-loading');
    // Run split-text immediately under reduced-motion (words visible, no anim)
    initSplitText(true);
    initScrollObserver();
  }

  initMobileMenu();
  initCarousel();
  initForm();

  // Enhancement 2: Custom cursor (desktop, no reduced-motion, no coarse)
  if (!prefersReducedMotion && !coarsePointer) {
    initCustomCursor();
  }

  // Enhancement 5: Magnetic CTAs (desktop, no reduced-motion, no coarse)
  if (!prefersReducedMotion && !coarsePointer) {
    initMagneticCTAs();
  }

  // Enhancement 6: Side progress indicator (desktop ≥1100px handled via CSS)
  initProgressNav();

  // Enhancement 7: Parallax on images
  if (!prefersReducedMotion) {
    initParallax();
  }

  // Enhancement 8: 3D tilt on service cards (no reduced-motion, no coarse)
  if (!prefersReducedMotion && !coarsePointer) {
    initTilt();
  }
});

// ─── 1. PRELOADER ─────────────────────────────────────────────────────────────
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.body.classList.add('is-loading');

  // After ~1.4s (fade-in 0.7s delay 0.2s + line 0.5s delay 0.9s = 1.4s total) → slide up
  const slideDelay = 1500;
  setTimeout(() => {
    preloader.classList.add('is-leaving');
    preloader.addEventListener('animationend', () => {
      preloader.remove();
      document.body.classList.remove('is-loading');
      // Run split-text + scroll observer after preloader leaves
      initSplitText(false);
      initScrollObserver();
      // Run hero split-text words immediately
      revealHeroWords();
    }, { once: true });
  }, slideDelay);
}

// ─── 10. SPLIT-TEXT STAGGER REVEAL ────────────────────────────────────────────
function initSplitText(immediate) {
  const headings = document.querySelectorAll('[data-split]');
  headings.forEach(heading => {
    splitHeadingIntoWords(heading);
  });

  if (immediate) {
    // Reduced-motion: reveal all words immediately without transition
    document.querySelectorAll('.word').forEach(w => {
      w.style.opacity = '1';
      w.style.transform = 'none';
    });
    return;
  }

  // Set up IntersectionObserver for section headings (not hero)
  const splitIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const words = entry.target.querySelectorAll('.word');
        staggerWords(words, 0);
        splitIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  headings.forEach(heading => {
    // Hero h1 is triggered separately after preloader
    if (heading.id !== 'hero-title') {
      splitIO.observe(heading);
    }
  });
}

function revealHeroWords() {
  const heroTitle = document.getElementById('hero-title');
  if (!heroTitle) return;
  const words = heroTitle.querySelectorAll('.word');
  staggerWords(words, 100); // slight extra delay so page settles
}

function splitHeadingIntoWords(el) {
  // Walk child nodes, splitting text nodes into word spans
  // Preserve existing <em class="italic"> and <br> elements
  const originalHTML = el.innerHTML;
  // Parse via temporary div preserving structure
  const tmp = document.createElement('div');
  tmp.innerHTML = originalHTML;
  el.innerHTML = '';
  processNode(tmp, el);
}

function processNode(source, target) {
  source.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Split text by spaces, wrapping each word in .word span
      const text = node.textContent;
      const parts = text.split(/(\s+)/);
      parts.forEach(part => {
        if (/^\s+$/.test(part)) {
          // Whitespace node
          target.appendChild(document.createTextNode(part));
        } else if (part.length > 0) {
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = part;
          target.appendChild(span);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BR') {
        target.appendChild(document.createElement('br'));
      } else if (node.tagName === 'EM') {
        // Wrap EM content words, but keep the EM element
        const emClone = document.createElement('em');
        emClone.className = node.className;
        if (node.style.cssText) emClone.style.cssText = node.style.cssText;
        processNode(node, emClone);
        target.appendChild(emClone);
      } else if (node.tagName === 'SPAN') {
        const spanClone = node.cloneNode(true);
        target.appendChild(spanClone);
      } else {
        const clone = node.cloneNode(true);
        target.appendChild(clone);
      }
    }
  });
}

function staggerWords(words, baseDelay) {
  words.forEach((word, i) => {
    setTimeout(() => {
      word.classList.add('is-visible');
    }, baseDelay + i * 80);
  });
}

// ─── SCROLL REVEAL (existing, enhanced) ───────────────────────────────────────
function initScrollObserver() {
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

// ─── 2. CUSTOM CURSOR ─────────────────────────────────────────────────────────
function initCustomCursor() {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');

  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add('custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover detection — expand ring on interactive elements
  const hoverTargets = 'a, button, .service, .insta__tile';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('is-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('is-hover');
    }
  });

  function animateCursor() {
    // Dot: follows exactly
    dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;

    // Ring: lerp with lag
    const lerp = 0.12;
    ringX += (mouseX - ringX) * lerp;
    ringY += (mouseY - ringY) * lerp;
    ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;

    rafId = requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

// ─── 5. MAGNETIC CTAs ─────────────────────────────────────────────────────────
function initMagneticCTAs() {
  const buttons = document.querySelectorAll('.btn');
  const RADIUS = 60; // px — magnetic field radius
  const STRENGTH = 0.35; // pull factor

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < RADIUS) {
        const pull = Math.max(6, Math.min(10, (RADIUS - dist) / RADIUS * 10));
        btn.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ─── 6. SIDE PROGRESS INDICATOR ───────────────────────────────────────────────
function initProgressNav() {
  const nav = document.getElementById('progress-nav');
  if (!nav) return;

  const sections = Array.from(document.querySelectorAll('[data-section]'));
  if (sections.length === 0) return;

  const labels = {
    home: 'Início',
    sobre: 'Sobre',
    servicos: 'Serviços',
    filosofia: 'Filosofia',
    cursos: 'Cursos',
    clinica: 'Clínica',
    depo: 'Depoimentos',
    insta: 'Instagram',
    contato: 'Contato',
  };

  // Show nav (CSS hides below 1100px)
  nav.removeAttribute('hidden');

  const dots = sections.map((section, i) => {
    const btn = document.createElement('button');
    btn.className = 'progress-nav__dot';
    const key = section.dataset.section;
    btn.setAttribute('aria-label', labels[key] || `Seção ${i + 1}`);
    btn.addEventListener('click', () => {
      section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
    nav.appendChild(btn);
    return btn;
  });

  // IntersectionObserver to track active section
  let activeIndex = 0;
  const progressIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target);
        if (idx !== -1) {
          dots[activeIndex].classList.remove('is-active');
          activeIndex = idx;
          dots[activeIndex].classList.add('is-active');
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => progressIO.observe(s));
  // Set first as active initially
  if (dots[0]) dots[0].classList.add('is-active');
}

// ─── 7. PARALLAX ON IMAGES ────────────────────────────────────────────────────
function initParallax() {
  const parallaxImgs = document.querySelectorAll(
    '.hero__image img, .doctor__photo img, .cursos__image img, .clinica__tile img'
  );

  if (parallaxImgs.length === 0) return;

  // Set overflow hidden on parent wrappers (already set in CSS)
  parallaxImgs.forEach(img => {
    img.style.willChange = 'transform';
  });

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    parallaxImgs.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const distFromCenter = centerY - vh / 2;
      // Normalize: -1 (above) to 1 (below)
      const normalized = distFromCenter / (vh * 0.8);
      const clamped = Math.max(-1, Math.min(1, normalized));
      const offset = clamped * 24; // max ±24px
      img.style.setProperty('--p', `${offset}px`);
      img.style.transform = `translateY(${offset}px) scale(1.06)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial run
  updateParallax();
}

// ─── 8. 3D TILT ON SERVICE CARDS ──────────────────────────────────────────────
function initTilt() {
  const cards = document.querySelectorAll('.service');
  const MAX_DEG = 4;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * MAX_DEG;
      const rotY = dx * MAX_DEG;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

// ─── MOBILE MENU (unchanged) ──────────────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    menu.hidden = open;
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    menu.hidden = true;
  }));
}

// ─── CAROUSEL (unchanged) ─────────────────────────────────────────────────────
function initCarousel() {
  const track = document.getElementById('depo-track');
  if (!track) return;
  const slides = Array.from(track.querySelectorAll('.depo__slide'));
  const dotsBox = document.querySelector('.depo__dots');
  const prev = document.querySelector('.depo__arrow--prev');
  const next = document.querySelector('.depo__arrow--next');
  let idx = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'depo__dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
    dot.setAttribute('aria-selected', String(i === 0));
    dot.addEventListener('click', () => go(i));
    dotsBox.appendChild(dot);
  });

  function go(n) {
    idx = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.setAttribute('aria-hidden', String(i !== idx)));
    dotsBox.querySelectorAll('.depo__dot').forEach((d, i) => d.setAttribute('aria-selected', String(i === idx)));
  }

  prev.addEventListener('click', () => go(idx - 1));
  next.addEventListener('click', () => go(idx + 1));

  let timer = setInterval(() => go(idx + 1), 7000);
  const carousel = document.querySelector('.depo__carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => { timer = setInterval(() => go(idx + 1), 7000); });
}

// ─── FORM (unchanged) ─────────────────────────────────────────────────────────
function initForm() {
  const form = document.getElementById('contato-form');
  if (!form) return;
  const status = document.getElementById('contato-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'contato__status';
    status.textContent = '';

    const data = new FormData(form);
    const nome = (data.get('nome') || '').toString().trim();
    const whatsapp = (data.get('whatsapp') || '').toString().trim();
    const proc = (data.get('procedimento') || '').toString();
    const msg = (data.get('mensagem') || '').toString().trim();

    if (!nome || !whatsapp || !proc) {
      status.textContent = 'Preencha nome, WhatsApp e procedimento.';
      status.classList.add('is-error');
      return;
    }

    const subject = encodeURIComponent(`Novo contato — ${proc}`);
    const body = encodeURIComponent(
      `Nome: ${nome}\nWhatsApp: ${whatsapp}\nProcedimento: ${proc}\n\nMensagem:\n${msg}`
    );
    window.location.href = `mailto:contato@seguraeco.com?subject=${subject}&body=${body}`;
    status.textContent = 'Abrindo seu e-mail…';
    status.classList.add('is-ok');
  });
}
