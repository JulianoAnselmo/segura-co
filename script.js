// Segura & Co — Round 3: premium editorial
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

document.addEventListener('DOMContentLoaded', () => {
  if (!prefersReducedMotion) {
    initPreloader();
  } else {
    const pl = document.getElementById('preloader');
    if (pl) pl.remove();
    document.body.classList.remove('is-loading');
    initSplitText(true);
    initScrollObserver();
    initLuxAnimations(true);
  }

  initMobileMenu();
  initCarousel();
  initForm();
  initFaq();

  if (!prefersReducedMotion && !coarsePointer) {
    initMagneticCTAs();
  }

  initProgressNav();

  if (!prefersReducedMotion) {
    initParallax();
  }

  if (!prefersReducedMotion && !coarsePointer) {
    initTilt();
    initHeroSpotlight();
  }
});

// ─── PRELOADER ────────────────────────────────────────────────────────────────
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  document.body.classList.add('is-loading');
  const slideDelay = 1500;
  setTimeout(() => {
    preloader.classList.add('is-leaving');
    preloader.addEventListener('animationend', () => {
      preloader.remove();
      document.body.classList.remove('is-loading');
      initSplitText(false);
      initScrollObserver();
      initLuxAnimations(false);
      revealHeroWords();
    }, { once: true });
  }, slideDelay);
}

// ─── SPLIT-TEXT ───────────────────────────────────────────────────────────────
function initSplitText(immediate) {
  const headings = document.querySelectorAll('[data-split]');
  headings.forEach(heading => splitHeadingIntoWords(heading));

  if (immediate) {
    document.querySelectorAll('.word').forEach(w => w.classList.add('is-visible'));
    return;
  }

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
    if (heading.id !== 'hero-title') splitIO.observe(heading);
  });
}

function revealHeroWords() {
  const heroTitle = document.getElementById('hero-title');
  if (!heroTitle) return;
  const words = heroTitle.querySelectorAll('.word');
  staggerWords(words, 100);
}

function splitHeadingIntoWords(el) {
  const originalHTML = el.innerHTML;
  const tmp = document.createElement('div');
  tmp.innerHTML = originalHTML;
  el.innerHTML = '';
  processNode(tmp, el);
}

function processNode(source, target) {
  source.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = node.textContent.split(/(\s+)/);
      parts.forEach(part => {
        if (/^\s+$/.test(part)) {
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
        const emClone = document.createElement('em');
        emClone.className = node.className;
        if (node.style.cssText) emClone.style.cssText = node.style.cssText;
        processNode(node, emClone);
        target.appendChild(emClone);
      } else {
        const clone = node.cloneNode(true);
        target.appendChild(clone);
      }
    }
  });
}

function staggerWords(words, baseDelay) {
  words.forEach((word, i) => {
    setTimeout(() => word.classList.add('is-visible'), baseDelay + i * 80);
  });
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
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

// ─── LUXURY ANIMATIONS (letter-spread, chapter-hairline) ──────────────────────
function initLuxAnimations(immediate) {
  const spreadEls = document.querySelectorAll('[data-letter-spread]');
  const hairlines = document.querySelectorAll('.chapter-hairline');

  if (immediate) {
    spreadEls.forEach(e => e.classList.add('is-spread'));
    hairlines.forEach(h => h.classList.add('is-drawn'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-spread');
        entry.target.classList.add('is-drawn');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });

  spreadEls.forEach(el => io.observe(el));
  hairlines.forEach(h => io.observe(h));
}

// ─── MAGNETIC CTAs (halved strength) ──────────────────────────────────────────
function initMagneticCTAs() {
  const buttons = document.querySelectorAll('.btn');
  const RADIUS = 60;
  const STRENGTH = 0.175; // halved from 0.35

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < RADIUS) {
        btn.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
      }
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

// ─── SIDE PROGRESS INDICATOR ──────────────────────────────────────────────────
function initProgressNav() {
  const nav = document.getElementById('progress-nav');
  if (!nav) return;

  const sections = Array.from(document.querySelectorAll('[data-section]'));
  if (sections.length === 0) return;

  const labels = {
    home: 'Início',
    sobre: 'Sobre',
    servicos: 'Serviços',
    cursos: 'Cursos',
    clinica: 'Clínica',
    depo: 'Depoimentos',
    insta: 'Instagram',
    faq: 'FAQ',
    contato: 'Contato',
  };

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
  if (dots[0]) dots[0].classList.add('is-active');
}

// ─── PARALLAX (halved factor) ─────────────────────────────────────────────────
function initParallax() {
  const parallaxImgs = document.querySelectorAll(
    '.proc-block__image img, .sobre__strip img, .clinica__hero img'
  );
  if (parallaxImgs.length === 0) return;

  parallaxImgs.forEach(img => { img.style.willChange = 'transform'; });
  let ticking = false;

  function updateParallax() {
    const vh = window.innerHeight;
    parallaxImgs.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const distFromCenter = centerY - vh / 2;
      const normalized = distFromCenter / (vh * 0.8);
      const clamped = Math.max(-1, Math.min(1, normalized));
      const offset = clamped * 12; // halved from 24
      img.style.transform = `translateY(${offset}px) scale(1.04)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();
}

// ─── 3D TILT ON SECONDARY CARDS (halved max-deg) ──────────────────────────────
function initTilt() {
  const cards = document.querySelectorAll('.sec-card, .course-card');
  const MAX_DEG = 2; // halved from 4

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

// ─── HERO SPOTLIGHT ───────────────────────────────────────────────────────────
function initHeroSpotlight() {
  const hero = document.querySelector('.hero');
  const spotlight = document.querySelector('.hero__spotlight');
  if (!hero || !spotlight) return;

  let mx = 50, my = 50;
  let lerpX = 50, lerpY = 50;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mx = ((e.clientX - rect.left) / rect.width) * 100;
    my = ((e.clientY - rect.top) / rect.height) * 100;
  });

  hero.addEventListener('mouseleave', () => { mx = 50; my = 50; });

  function animateSpotlight() {
    const speed = 0.05;
    lerpX += (mx - lerpX) * speed;
    lerpY += (my - lerpY) * speed;
    spotlight.style.background = `radial-gradient(circle 500px at ${lerpX.toFixed(2)}% ${lerpY.toFixed(2)}%, rgba(201,169,110,0.06) 0%, transparent 70%)`;
    requestAnimationFrame(animateSpotlight);
  }
  animateSpotlight();
}

// ─── MOBILE MENU ──────────────────────────────────────────────────────────────
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

// ─── CAROUSEL ─────────────────────────────────────────────────────────────────
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

// ─── FAQ (ensure only one open at a time — optional, nicer UX) ────────────────
function initFaq() {
  const items = document.querySelectorAll('.faq__item');
  items.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach(other => { if (other !== item) other.open = false; });
      }
    });
  });
}

// ─── FORM ─────────────────────────────────────────────────────────────────────
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
