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

function initMobileMenu() { /* preenchido na Task 2 */ }
function initCarousel() { /* preenchido na Task 9 */ }
function initForm() { /* preenchido na Task 11 */ }
