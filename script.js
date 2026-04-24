// Segura & Co — interações do site
document.addEventListener('DOMContentLoaded', () => {
  initScrollObserver();
  initMobileMenu();
  initCarousel();
  initForm();
});

function initScrollObserver() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
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
