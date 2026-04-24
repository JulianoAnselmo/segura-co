# Segura & Co Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir site single-page responsivo para clínica Segura & Co (Catanduva-SP + Miami) usando HTML5 + CSS3 + JS vanilla, sem build step.

**Architecture:** Três arquivos estáticos (`index.html`, `styles.css`, `script.js`) na raiz do projeto. Fontes via Google Fonts CDN (Parisienne, Playfair Display, Inter). Assets locais em `imagens/`. Mobile-first. JS vanilla com IntersectionObserver, sem dependências.

**Tech Stack:** HTML5 semântico, CSS3 (Custom Properties, Grid, Flex), JavaScript vanilla (ES2020), Google Fonts CDN.

**Spec:** `docs/superpowers/specs/2026-04-23-segura-co-site-design.md`

---

## File Structure

```
segura e co/
├── index.html              # Single-page com 11 seções
├── styles.css              # Estilos completos (~900 linhas)
├── script.js               # Menu mobile, scroll, observer, carrossel, form
├── imagens/                # Já populada pela usuária (27 arquivos)
└── docs/superpowers/
    ├── specs/2026-04-23-segura-co-site-design.md
    └── plans/2026-04-23-segura-co-site.md
```

**Responsabilidades:**
- `index.html` — estrutura semântica, conteúdo final em pt-BR, ordem das seções conforme spec §4
- `styles.css` — tokens de design (Custom Properties), reset, tipografia, layout por seção, responsivo
- `script.js` — interações: menu hamburger, scroll suave, fade-in on scroll, carrossel depoimentos, validação form

---

## Design Tokens (referência — usar em todas as tasks)

```css
:root {
  /* Cores */
  --cream: #FAF6F1;
  --caramel: #B87333;
  --champagne: #C9A96E;
  --rose: #D9B8A4;
  --brown: #5A4A42;
  --black: #1A1A1A;
  --muted: #8A7A70;

  /* Tipografia */
  --font-script: 'Parisienne', cursive;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;

  /* Espaçamento */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 48px;
  --space-xl: 96px;

  /* Layout */
  --max-w: 1280px;
  --gutter: 40px;
  --gutter-mobile: 20px;

  /* Animação */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur: 0.4s;
}
```

---

## Task 1: Setup inicial

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`

- [ ] **Step 1: Criar `index.html` com shell completo**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Segura & Co — Harmonização facial com naturalidade, ciência e sensibilidade. Clínica em Catanduva-SP e Miami. Dra. Carol Segura, CROSP 109060.">
  <meta property="og:title" content="Segura & Co — Harmonização Facial em Catanduva e Miami">
  <meta property="og:description" content="Há 13 anos harmonizando rostos com naturalidade. Dra. Carol Segura e Dra. Juliana Segura.">
  <meta property="og:type" content="website">
  <title>Segura & Co — Harmonização Facial em Catanduva e Miami</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Parisienne&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Segura & Co",
    "description": "Clínica de harmonização facial especializada em resultados naturais.",
    "url": "https://seguraeco.com",
    "telephone": "+55-17-99999-9999",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Catanduva",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "medicalSpecialty": "CosmeticProcedure",
    "founder": [
      {"@type": "Person", "name": "Dra. Carol Segura", "identifier": "CROSP 109060"},
      {"@type": "Person", "name": "Dra. Juliana Segura"}
    ],
    "sameAs": [
      "https://www.instagram.com/seguraecompany/",
      "https://www.instagram.com/dra.carolsegura/"
    ]
  }
  </script>
</head>
<body>
  <!-- Seções inseridas nas próximas tasks -->
  <script src="script.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Criar `styles.css` com tokens + reset**

```css
/* === Tokens === */
:root {
  --cream: #FAF6F1;
  --caramel: #B87333;
  --champagne: #C9A96E;
  --rose: #D9B8A4;
  --brown: #5A4A42;
  --black: #1A1A1A;
  --muted: #8A7A70;
  --font-script: 'Parisienne', cursive;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 48px;
  --space-xl: 96px;
  --max-w: 1280px;
  --gutter: 40px;
  --gutter-mobile: 20px;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur: 0.4s;
}

/* === Reset === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
body {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: 16px;
  line-height: 1.6;
  color: var(--brown);
  background: var(--cream);
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
button { font: inherit; background: none; border: none; cursor: pointer; color: inherit; }

/* === Utilitários === */
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 var(--gutter); }
.label { font-family: var(--font-sans); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--caramel); font-weight: 500; }
.h-serif { font-family: var(--font-serif); font-weight: 400; color: var(--black); line-height: 1.1; letter-spacing: -0.5px; }
.italic { font-style: italic; }
.btn { display: inline-block; font-family: var(--font-sans); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; padding: 16px 32px; transition: all var(--dur) var(--ease); cursor: pointer; }
.btn-primary { background: var(--black); color: var(--cream); }
.btn-primary:hover { background: var(--caramel); }
.btn-outline { border: 1px solid var(--black); color: var(--black); }
.btn-outline:hover { background: var(--black); color: var(--cream); }

/* === Responsivo base === */
@media (max-width: 900px) {
  .container { padding: 0 var(--gutter-mobile); }
}
```

- [ ] **Step 3: Criar `script.js` com scaffold**

```javascript
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
```

- [ ] **Step 4: Verificar no navegador**

Abrir `index.html` diretamente. Esperado: página vazia com fundo creme, fontes carregando sem erro no console. Verificar Network tab — fontes do Google carregam 200.

- [ ] **Step 5: Commit (se git inicializado)**

```bash
git init 2>/dev/null || true
git add index.html styles.css script.js
git commit -m "chore: bootstrap site Segura & Co"
```

---

## Task 2: Navbar fixa

**Files:**
- Modify: `index.html` (adicionar `<header>` dentro de `<body>`)
- Modify: `styles.css` (adicionar bloco `/* === Navbar === */`)
- Modify: `script.js` (preencher `initMobileMenu()`)

- [ ] **Step 1: Adicionar HTML do header**

Inserir logo após `<body>`:

```html
<header class="nav" role="banner">
  <div class="container nav__inner">
    <a href="#home" class="nav__logo" aria-label="Segura & Co — início">
      <span class="nav__logo-script">Segura</span><span class="nav__logo-italic">&nbsp;&amp;&nbsp;Co.</span>
    </a>
    <nav class="nav__links" aria-label="Navegação principal">
      <a href="#sobre">Sobre</a>
      <a href="#servicos">Serviços</a>
      <a href="#cursos">Cursos</a>
      <a href="#clinica">Clínica</a>
      <a href="#contato">Contato</a>
      <a href="#contato" class="btn btn-primary nav__cta">Agendar</a>
    </nav>
    <button class="nav__toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div id="mobile-menu" class="nav__mobile" hidden>
    <a href="#sobre">Sobre</a>
    <a href="#servicos">Serviços</a>
    <a href="#cursos">Cursos</a>
    <a href="#clinica">Clínica</a>
    <a href="#contato">Contato</a>
    <a href="#contato" class="btn btn-primary">Agendar consulta</a>
  </div>
</header>
```

- [ ] **Step 2: Adicionar CSS do navbar**

Apendar em `styles.css`:

```css
/* === Navbar === */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: rgba(250, 246, 241, 0.94);
  backdrop-filter: blur(10px);
  z-index: 100;
  border-bottom: 1px solid rgba(201, 169, 110, 0.2);
}
.nav__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
  padding-bottom: 18px;
}
.nav__logo { display: inline-flex; align-items: baseline; gap: 4px; color: var(--black); }
.nav__logo-script { font-family: var(--font-script); font-size: 32px; line-height: 1; }
.nav__logo-italic { font-family: var(--font-serif); font-style: italic; font-size: 18px; }
.nav__links { display: flex; align-items: center; gap: 32px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
.nav__links a { color: var(--black); transition: color var(--dur) var(--ease); }
.nav__links a:hover { color: var(--caramel); }
.nav__cta { padding: 10px 20px; font-size: 10px; letter-spacing: 3px; }
.nav__cta:hover { color: var(--cream); }
.nav__toggle { display: none; width: 32px; height: 32px; flex-direction: column; justify-content: center; gap: 5px; }
.nav__toggle span { display: block; height: 1.5px; background: var(--black); transition: transform var(--dur) var(--ease), opacity var(--dur) var(--ease); }
.nav__toggle[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav__toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.nav__toggle[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.nav__mobile {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px var(--gutter-mobile);
  background: var(--cream);
  border-top: 1px solid rgba(201, 169, 110, 0.2);
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.nav__mobile[hidden] { display: none; }

@media (max-width: 900px) {
  .nav__links { display: none; }
  .nav__toggle { display: flex; }
}
```

- [ ] **Step 3: Preencher `initMobileMenu()`**

Em `script.js`:

```javascript
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
```

- [ ] **Step 4: Verificar no navegador**

Recarregar. Desktop: navbar fixa com logo script + 5 links + CTA preto. Mobile (DevTools 375px): navbar compacta com hamburger. Clicar hamburger abre menu; clicar link fecha.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js
git commit -m "feat: navbar fixa com menu mobile"
```

---

## Task 3: Hero split editorial

**Files:**
- Modify: `index.html` (adicionar `<section id="home" class="hero">`)
- Modify: `styles.css` (bloco `/* === Hero === */`)

- [ ] **Step 1: Adicionar HTML do hero**

Após `</header>`:

```html
<section id="home" class="hero" aria-labelledby="hero-title">
  <div class="hero__grid">
    <div class="hero__text" data-reveal>
      <span class="label hero__eyebrow">Est. 2013 · Catanduva · Miami</span>
      <h1 id="hero-title" class="h-serif hero__title">
        Beleza com <em class="italic" style="color:var(--caramel)">ciência.</em><br>
        Resultado com <em class="italic">naturalidade.</em>
      </h1>
      <p class="hero__sub">
        Há 13 anos harmonizando rostos com sensibilidade clínica.<br>
        Dra. Carol Segura · <span style="color:var(--caramel)">CROSP 109060</span>
      </p>
      <div class="hero__ctas">
        <a href="#contato" class="btn btn-primary">Agendar consulta</a>
        <a href="#cursos" class="btn btn-outline">Cursos VIP →</a>
      </div>
      <div class="hero__meta">
        <span>@seguraecompany</span>
        <span>52,3k +</span>
        <span>Scroll ↓</span>
      </div>
    </div>
    <div class="hero__image" data-reveal>
      <img src="imagens/foto-doutora.webp" alt="Dra. Carol Segura" width="900" height="1200">
      <span class="hero__signature">Dra. Carol Segura</span>
      <span class="hero__counter">01 / 04</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Adicionar CSS do hero + reveal animation base**

Apendar:

```css
/* === Reveal animation === */
[data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
[data-reveal].revealed { opacity: 1; transform: none; }

/* === Hero === */
.hero { padding-top: 72px; /* espaço para navbar */ min-height: 100vh; background: var(--cream); }
.hero__grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  min-height: calc(100vh - 72px);
  max-width: var(--max-w);
  margin: 0 auto;
}
.hero__text {
  padding: var(--space-xl) var(--gutter);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-lg);
  position: relative;
}
.hero__text::before, .hero__text::after {
  content: ""; position: absolute; background: var(--champagne);
}
.hero__text::before { top: 32px; left: 32px; width: 48px; height: 1px; }
.hero__text::after { top: 32px; left: 32px; width: 1px; height: 48px; }
.hero__eyebrow { display: block; }
.hero__title { font-size: clamp(40px, 5.5vw, 68px); }
.hero__sub { font-size: 17px; font-weight: 300; color: var(--brown); margin-top: var(--space-md); max-width: 440px; line-height: 1.55; }
.hero__ctas { display: flex; gap: var(--space-sm); margin-top: var(--space-md); flex-wrap: wrap; }
.hero__meta { display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); }
.hero__image { position: relative; overflow: hidden; }
.hero__image img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.hero__signature { position: absolute; bottom: 24px; right: 28px; font-family: var(--font-script); font-size: 28px; color: var(--cream); text-shadow: 0 1px 8px rgba(0,0,0,0.3); }
.hero__counter { position: absolute; top: 24px; right: 28px; font-size: 10px; letter-spacing: 3px; color: var(--cream); opacity: 0.85; }

@media (max-width: 900px) {
  .hero__grid { grid-template-columns: 1fr; min-height: auto; }
  .hero__text { padding: var(--space-xl) var(--gutter-mobile) var(--space-lg); }
  .hero__image { height: 70vh; min-height: 480px; }
  .hero__title { font-size: clamp(34px, 9vw, 56px); }
}
```

- [ ] **Step 3: Verificar no navegador**

Recarregar. Desktop: split 1.15/1, foto ocupa direita, texto à esquerda com hairline dourada no canto, headline grande com "ciência" e "naturalidade" em itálico. Mobile: stack (texto em cima, foto embaixo 70vh).

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: hero split editorial com foto doutora"
```

---

## Task 4: Seção Sobre (duas doutoras)

**Files:**
- Modify: `index.html` (adicionar `<section id="sobre">`)
- Modify: `styles.css` (bloco `/* === Sobre === */`)

- [ ] **Step 1: HTML**

Após hero:

```html
<section id="sobre" class="sobre" aria-labelledby="sobre-title">
  <div class="container">
    <div class="sobre__header" data-reveal>
      <span class="label">As fundadoras</span>
      <h2 id="sobre-title" class="h-serif sobre__title">Duas irmãs.<br>Uma mesma <em class="italic">filosofia</em>.</h2>
    </div>
    <div class="sobre__grid">
      <article class="doctor" data-reveal>
        <div class="doctor__photo"><img src="imagens/foto-doutora.webp" alt="Dra. Carol Segura" loading="lazy" width="600" height="800"></div>
        <div class="doctor__body">
          <span class="doctor__tag">CROSP 109060 · Verificada</span>
          <h3 class="h-serif doctor__name">Dra. Carol Segura</h3>
          <p class="doctor__bio">Treze anos de clínica dedicados à harmonização facial. Formada e especializada em procedimentos injetáveis avançados, atende em Catanduva e ministra cursos para profissionais em Miami. Reconhecida por resultados naturais e por um olhar que respeita a anatomia de cada paciente.</p>
          <a class="doctor__ig" href="https://www.instagram.com/dra.carolsegura/" target="_blank" rel="noopener">@dra.carolsegura →</a>
        </div>
      </article>
      <article class="doctor" data-reveal>
        <div class="doctor__photo"><img src="imagens/foto-doutora-2.webp" alt="Dra. Juliana Segura" loading="lazy" width="600" height="800"></div>
        <div class="doctor__body">
          <span class="doctor__tag">Sócia · Cofundadora</span>
          <h3 class="h-serif doctor__name">Dra. Juliana Segura</h3>
          <p class="doctor__bio">Complementa a clínica com sensibilidade e escuta. Junto com a irmã, construiu a Segura & Co como um espaço onde ciência e acolhimento caminham lado a lado — para pacientes e para profissionais em formação.</p>
          <a class="doctor__ig" href="https://www.instagram.com/drajulianasegura/" target="_blank" rel="noopener">@drajulianasegura →</a>
        </div>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
/* === Sobre === */
.sobre { padding: var(--space-xl) 0; background: var(--cream); }
.sobre__header { text-align: center; max-width: 720px; margin: 0 auto var(--space-xl); }
.sobre__title { font-size: clamp(32px, 4vw, 48px); margin-top: var(--space-sm); }
.sobre__grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); }
.doctor { display: grid; gap: var(--space-md); }
.doctor__photo { overflow: hidden; aspect-ratio: 3 / 4; background: var(--rose); }
.doctor__photo img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s var(--ease); }
.doctor:hover .doctor__photo img { transform: scale(1.03); }
.doctor__tag { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--caramel); font-weight: 500; }
.doctor__name { font-size: 32px; margin-top: var(--space-xs); }
.doctor__bio { font-size: 15px; line-height: 1.7; color: var(--brown); margin-top: var(--space-sm); }
.doctor__ig { display: inline-block; margin-top: var(--space-sm); font-size: 12px; letter-spacing: 2px; color: var(--black); border-bottom: 1px solid var(--champagne); padding-bottom: 2px; }
.doctor__ig:hover { color: var(--caramel); border-color: var(--caramel); }

@media (max-width: 900px) {
  .sobre__grid { grid-template-columns: 1fr; gap: var(--space-lg); }
}
```

- [ ] **Step 3: Verificar**

Duas colunas desktop, stack mobile. Hover na foto dá zoom leve. Links IG abrem Instagram em nova aba.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: seção Sobre com duas doutoras"
```

---

## Task 5: Serviços (grid 3x3)

**Files:**
- Modify: `index.html` (adicionar `<section id="servicos">`)
- Modify: `styles.css` (bloco `/* === Serviços === */`)

- [ ] **Step 1: HTML**

```html
<section id="servicos" class="servicos" aria-labelledby="servicos-title">
  <div class="container">
    <div class="servicos__header" data-reveal>
      <span class="label">O que fazemos</span>
      <h2 id="servicos-title" class="h-serif servicos__title">Procedimentos com <em class="italic">propósito</em>.</h2>
      <p class="servicos__intro">Cada protocolo é pensado a partir da anatomia, das expressões e dos objetivos reais de quem está na cadeira.</p>
    </div>
    <div class="servicos__grid">
      <article class="service" data-reveal>
        <svg class="service__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 14c1.5 1.5 6.5 1.5 8 0"/><circle cx="9" cy="10" r="0.5" fill="currentColor"/><circle cx="15" cy="10" r="0.5" fill="currentColor"/></svg>
        <h3 class="h-serif service__title">Harmonização Facial</h3>
        <p class="service__desc">Protocolo completo pensado para equilibrar proporções, preservando expressão e identidade.</p>
        <a href="#contato" class="service__link">Saiba mais →</a>
      </article>
      <article class="service" data-reveal>
        <svg class="service__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M12 3v18M10 7c-1 1-1 3 0 5M14 7c1 1 1 3 0 5"/></svg>
        <h3 class="h-serif service__title">Rinomodelação</h3>
        <p class="service__desc">Refinamento do contorno nasal com ácido hialurônico, sem cirurgia, resultado em uma sessão.</p>
        <a href="#contato" class="service__link">Saiba mais →</a>
      </article>
      <article class="service" data-reveal>
        <svg class="service__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M4 12c3-3 13-3 16 0-3 3-13 3-16 0z"/><path d="M8 12c0-1 8-1 8 0"/></svg>
        <h3 class="h-serif service__title">Preenchimento Labial</h3>
        <p class="service__desc">Volume e definição respeitando o formato natural dos lábios — sempre discreto.</p>
        <a href="#contato" class="service__link">Saiba mais →</a>
      </article>
      <article class="service" data-reveal>
        <svg class="service__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M4 10h16M6 10v2a6 6 0 0012 0v-2"/><path d="M10 6l2-2 2 2"/></svg>
        <h3 class="h-serif service__title">Botox</h3>
        <p class="service__desc">Aplicação de toxina botulínica para suavizar expressões sem travar o movimento.</p>
        <a href="#contato" class="service__link">Saiba mais →</a>
      </article>
      <article class="service" data-reveal>
        <svg class="service__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7" stroke-dasharray="2 2"/></svg>
        <h3 class="h-serif service__title">Bioestimuladores (PDRN)</h3>
        <p class="service__desc">Estímulo de colágeno e regeneração celular para pele mais firme e luminosa.</p>
        <a href="#contato" class="service__link">Saiba mais →</a>
      </article>
      <article class="service" data-reveal>
        <svg class="service__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M4 12c2-4 6-4 8 0 2 4 6 4 8 0"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/></svg>
        <h3 class="h-serif service__title">Tratamento de Olheiras</h3>
        <p class="service__desc">Protocolo específico para área dos olhos, unindo preenchimento e bioestímulo quando indicado.</p>
        <a href="#contato" class="service__link">Saiba mais →</a>
      </article>
      <article class="service" data-reveal>
        <svg class="service__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M12 4c-5 0-8 4-8 8s3 8 8 8 8-4 8-8-3-8-8-8z"/><path d="M9 12a3 3 0 006 0"/></svg>
        <h3 class="h-serif service__title">Bichectomia</h3>
        <p class="service__desc">Redução das bolsas de Bichat para afinar o terço inferior do rosto, feita com técnica minimamente invasiva.</p>
        <a href="#contato" class="service__link">Saiba mais →</a>
      </article>
      <article class="service" data-reveal>
        <svg class="service__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M5 14c2 4 12 4 14 0"/><path d="M7 11c0-3 10-3 10 0"/></svg>
        <h3 class="h-serif service__title">Lipo de Papada</h3>
        <p class="service__desc">Definição do contorno mandibular com redução de gordura submentoniana.</p>
        <a href="#contato" class="service__link">Saiba mais →</a>
      </article>
      <article class="service service--feature" data-reveal>
        <div class="service__photo"><img src="imagens/maquina-lavieen.webp" alt="Tratamento LAVIEEN" loading="lazy" width="600" height="400"></div>
        <h3 class="h-serif service__title">LAVIEEN</h3>
        <p class="service__desc">Tecnologia coreana de rejuvenescimento: melhora textura, poros e luminosidade sem downtime.</p>
        <a href="#contato" class="service__link">Saiba mais →</a>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
/* === Serviços === */
.servicos { padding: var(--space-xl) 0; background: #F5EFE7; }
.servicos__header { text-align: center; max-width: 720px; margin: 0 auto var(--space-xl); }
.servicos__title { font-size: clamp(32px, 4vw, 48px); margin-top: var(--space-sm); }
.servicos__intro { margin-top: var(--space-md); font-size: 16px; color: var(--brown); }
.servicos__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(201, 169, 110, 0.3); border: 1px solid rgba(201, 169, 110, 0.3); }
.service { background: #F5EFE7; padding: var(--space-lg) var(--space-md); display: flex; flex-direction: column; gap: var(--space-sm); transition: background var(--dur) var(--ease); }
.service:hover { background: var(--cream); }
.service__icon { width: 36px; height: 36px; color: var(--caramel); margin-bottom: var(--space-xs); }
.service__title { font-size: 22px; }
.service__desc { font-size: 14px; line-height: 1.6; color: var(--brown); flex: 1; }
.service__link { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--black); border-bottom: 1px solid var(--champagne); align-self: flex-start; padding-bottom: 2px; }
.service__link:hover { color: var(--caramel); border-color: var(--caramel); }
.service--feature { grid-column: span 1; }
.service__photo { aspect-ratio: 4 / 3; overflow: hidden; margin-bottom: var(--space-sm); }
.service__photo img { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 900px) {
  .servicos__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .servicos__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verificar**

Grid 3x3 desktop com hairlines douradas divisórias. Hover muda fundo pra cream claro. Tablet 2 colunas. Mobile 1 coluna. LAVIEEN destaca imagem.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: serviços grid com 9 procedimentos"
```

---

## Task 6: Filosofia (três pilares)

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: HTML**

```html
<section class="filosofia" aria-labelledby="filosofia-title">
  <div class="container">
    <div class="filosofia__header" data-reveal>
      <span class="label">Como trabalhamos</span>
      <h2 id="filosofia-title" class="h-serif filosofia__title">Três pilares que guiam cada <em class="italic">decisão clínica</em>.</h2>
    </div>
    <div class="filosofia__grid">
      <div class="pilar" data-reveal>
        <svg class="pilar__icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M16 4v24M8 10l8-6 8 6M8 22l8 6 8-6"/></svg>
        <h3 class="h-serif pilar__title">Ciência</h3>
        <p class="pilar__desc">Estudo contínuo e atualização técnica. Cada protocolo vem de evidência clínica, não de tendência.</p>
      </div>
      <div class="pilar" data-reveal>
        <svg class="pilar__icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M6 20c4-8 16-8 20 0"/><circle cx="16" cy="20" r="2"/></svg>
        <h3 class="h-serif pilar__title">Naturalidade</h3>
        <p class="pilar__desc">O resultado respeita a anatomia e preserva a sua identidade. Ninguém precisa saber — só você vai se sentir melhor.</p>
      </div>
      <div class="pilar" data-reveal>
        <svg class="pilar__icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M16 28s-10-6-10-14a6 6 0 0110-4 6 6 0 0110 4c0 8-10 14-10 14z"/></svg>
        <h3 class="h-serif pilar__title">Sensibilidade</h3>
        <p class="pilar__desc">Escuta ativa antes de qualquer agulha. Entender o que você quer e o que faz sentido pra você.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
/* === Filosofia === */
.filosofia { padding: var(--space-xl) 0; background: var(--cream); }
.filosofia__header { text-align: center; max-width: 720px; margin: 0 auto var(--space-xl); }
.filosofia__title { font-size: clamp(30px, 4vw, 44px); margin-top: var(--space-sm); }
.filosofia__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-xl); }
.pilar { text-align: center; padding: 0 var(--space-md); }
.pilar__icon { width: 48px; height: 48px; color: var(--caramel); margin: 0 auto var(--space-md); }
.pilar__title { font-size: 26px; margin-bottom: var(--space-sm); }
.pilar__desc { font-size: 15px; line-height: 1.7; color: var(--brown); }

@media (max-width: 900px) {
  .filosofia__grid { grid-template-columns: 1fr; gap: var(--space-lg); }
}
```

- [ ] **Step 3: Verificar + Commit**

```bash
git add index.html styles.css
git commit -m "feat: três pilares (ciência, naturalidade, sensibilidade)"
```

---

## Task 7: Cursos VIP (faixa dark)

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: HTML**

```html
<section id="cursos" class="cursos" aria-labelledby="cursos-title">
  <div class="cursos__grid">
    <div class="cursos__image" data-reveal>
      <img src="imagens/foto-curso-1.webp" alt="Curso VIP de harmonização" loading="lazy" width="900" height="1100">
    </div>
    <div class="cursos__body" data-reveal>
      <span class="label cursos__eyebrow">Para profissionais injetores</span>
      <h2 id="cursos-title" class="h-serif cursos__title">Cursos <em class="italic">VIP</em>.<br>Formação de quem treina.</h2>
      <p class="cursos__desc">Turmas reduzidas, mentoria individual e foco em técnicas autorais da Dra. Carol Segura. Os cursos <strong>RINO</strong> e <strong>VIP de Naturalidade</strong> são estruturados pra levar dentistas e médicas injetoras a outro patamar — com prática clínica real e acompanhamento pós-curso.</p>
      <ul class="cursos__bullets">
        <li>Turmas em Catanduva e Miami</li>
        <li>Grupo restrito · vagas limitadas</li>
        <li>Técnica de rinomodelação autoral</li>
        <li>Protocolo de naturalidade proprietário</li>
      </ul>
      <a href="#contato" class="btn cursos__cta">Entrar na lista de espera →</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
/* === Cursos === */
.cursos { background: var(--black); color: var(--cream); }
.cursos__grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 640px; max-width: var(--max-w); margin: 0 auto; }
.cursos__image { overflow: hidden; }
.cursos__image img { width: 100%; height: 100%; object-fit: cover; }
.cursos__body { padding: var(--space-xl) var(--gutter); display: flex; flex-direction: column; justify-content: center; gap: var(--space-md); }
.cursos__eyebrow { color: var(--champagne) !important; }
.cursos__title { color: var(--cream); font-size: clamp(32px, 4vw, 48px); }
.cursos__desc { font-size: 16px; line-height: 1.7; color: rgba(250, 246, 241, 0.85); }
.cursos__desc strong { color: var(--champagne); font-weight: 500; }
.cursos__bullets { list-style: none; display: grid; gap: var(--space-xs); font-size: 14px; color: rgba(250, 246, 241, 0.85); }
.cursos__bullets li { padding-left: 20px; position: relative; }
.cursos__bullets li::before { content: "—"; position: absolute; left: 0; color: var(--caramel); }
.cursos__cta { align-self: flex-start; background: var(--cream); color: var(--black); margin-top: var(--space-sm); }
.cursos__cta:hover { background: var(--caramel); color: var(--cream); }

@media (max-width: 900px) {
  .cursos__grid { grid-template-columns: 1fr; min-height: auto; }
  .cursos__image { aspect-ratio: 4 / 3; }
  .cursos__body { padding: var(--space-lg) var(--gutter-mobile); }
}
```

- [ ] **Step 3: Verificar + Commit**

```bash
git add index.html styles.css
git commit -m "feat: seção cursos VIP em faixa dark"
```

---

## Task 8: Galeria da clínica (mosaico)

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: HTML**

```html
<section id="clinica" class="clinica" aria-labelledby="clinica-title">
  <div class="container">
    <div class="clinica__header" data-reveal>
      <span class="label">O espaço</span>
      <h2 id="clinica-title" class="h-serif clinica__title">Uma clínica <em class="italic">pensada</em> para acolher.</h2>
      <p class="clinica__intro">Inaugurada recentemente em Catanduva, a Segura & Co nasceu pra unir experiência clínica e conforto. Cada detalhe — da iluminação à escolha dos materiais — foi pensado pra que você se sinta em casa.</p>
    </div>
    <div class="clinica__mosaic">
      <div class="clinica__tile clinica__tile--tall" data-reveal><img src="imagens/escada-lustres.webp" alt="Escada com lustres da clínica" loading="lazy" width="600" height="900"></div>
      <div class="clinica__tile" data-reveal><img src="imagens/foto-clinica-interna-1.webp" alt="Recepção" loading="lazy" width="600" height="450"></div>
      <div class="clinica__tile" data-reveal><img src="imagens/foto-clinica-interna-3.webp" alt="Sala de atendimento" loading="lazy" width="600" height="450"></div>
      <div class="clinica__tile clinica__tile--wide" data-reveal><img src="imagens/foto-espaco-marca.webp" alt="Espaço da marca" loading="lazy" width="900" height="500"></div>
      <div class="clinica__tile" data-reveal><img src="imagens/foto-clinica-interna-6.webp" alt="Detalhe do espaço" loading="lazy" width="600" height="450"></div>
      <div class="clinica__tile" data-reveal><img src="imagens/foto-clinica-interna-8.webp" alt="Ambiente interno" loading="lazy" width="600" height="450"></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
/* === Clínica === */
.clinica { padding: var(--space-xl) 0; background: var(--cream); }
.clinica__header { text-align: center; max-width: 720px; margin: 0 auto var(--space-xl); }
.clinica__title { font-size: clamp(30px, 4vw, 44px); margin-top: var(--space-sm); }
.clinica__intro { margin-top: var(--space-md); font-size: 16px; color: var(--brown); line-height: 1.7; }
.clinica__mosaic { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 220px; gap: 12px; }
.clinica__tile { overflow: hidden; background: var(--rose); }
.clinica__tile img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s var(--ease); }
.clinica__tile:hover img { transform: scale(1.04); }
.clinica__tile--tall { grid-row: span 2; }
.clinica__tile--wide { grid-column: span 2; }

@media (max-width: 900px) {
  .clinica__mosaic { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
  .clinica__tile--tall { grid-row: span 2; }
  .clinica__tile--wide { grid-column: span 2; }
}
@media (max-width: 600px) {
  .clinica__mosaic { grid-template-columns: 1fr; grid-auto-rows: 240px; }
  .clinica__tile--tall, .clinica__tile--wide { grid-row: span 1; grid-column: span 1; }
}
```

- [ ] **Step 3: Verificar + Commit**

```bash
git add index.html styles.css
git commit -m "feat: galeria clinica mosaico assimétrico"
```

---

## Task 9: Depoimentos (carrossel)

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js` (preencher `initCarousel()`)

- [ ] **Step 1: HTML**

```html
<section class="depo" aria-labelledby="depo-title">
  <div class="container">
    <div class="depo__header" data-reveal>
      <span class="label">O que dizem</span>
      <h2 id="depo-title" class="h-serif depo__title">Quem passou pela <em class="italic">cadeira</em>.</h2>
    </div>
    <div class="depo__carousel" data-reveal>
      <button class="depo__arrow depo__arrow--prev" aria-label="Depoimento anterior">←</button>
      <div class="depo__track" id="depo-track">
        <article class="depo__slide" aria-hidden="false">
          <blockquote class="depo__quote">"Saí da Segura & Co parecendo eu mesma — só que melhor. A Dra. Carol entendeu exatamente o que eu queria sem exagerar em nada."</blockquote>
          <div class="depo__who"><strong>Paciente de harmonização facial</strong><span>Catanduva-SP</span></div>
        </article>
        <article class="depo__slide" aria-hidden="true">
          <blockquote class="depo__quote">"O curso RINO mudou completamente minha prática. Técnica autoral, acompanhamento real, turma pequena de verdade."</blockquote>
          <div class="depo__who"><strong>Dentista injetora, aluna do Curso RINO</strong><span>São Paulo-SP</span></div>
        </article>
        <article class="depo__slide" aria-hidden="true">
          <blockquote class="depo__quote">"Fiz rinomodelação com a Carol e nem amigas próximas notaram diferença — só que agora todas perguntam o que eu fiz. É exatamente esse o ponto."</blockquote>
          <div class="depo__who"><strong>Paciente de rinomodelação</strong><span>Miami-EUA</span></div>
        </article>
        <article class="depo__slide" aria-hidden="true">
          <blockquote class="depo__quote">"O espaço da clínica é de tirar o fôlego e o atendimento acompanha. Acolhimento é a palavra."</blockquote>
          <div class="depo__who"><strong>Paciente de bioestimulador</strong><span>Ribeirão Preto-SP</span></div>
        </article>
      </div>
      <button class="depo__arrow depo__arrow--next" aria-label="Próximo depoimento">→</button>
      <div class="depo__dots" role="tablist" aria-label="Depoimentos"></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
/* === Depoimentos === */
.depo { padding: var(--space-xl) 0; background: #F5EFE7; }
.depo__header { text-align: center; max-width: 720px; margin: 0 auto var(--space-lg); }
.depo__title { font-size: clamp(30px, 4vw, 44px); margin-top: var(--space-sm); }
.depo__carousel { position: relative; max-width: 820px; margin: 0 auto; padding: 0 var(--space-xl); }
.depo__track { overflow: hidden; position: relative; min-height: 280px; }
.depo__slide { position: absolute; inset: 0; opacity: 0; transition: opacity 0.6s var(--ease); text-align: center; padding: var(--space-lg) var(--space-md); }
.depo__slide[aria-hidden="false"] { opacity: 1; }
.depo__quote { font-family: var(--font-serif); font-style: italic; font-size: clamp(20px, 2.4vw, 28px); line-height: 1.4; color: var(--black); }
.depo__quote::before, .depo__quote::after { color: var(--caramel); }
.depo__who { margin-top: var(--space-md); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--brown); }
.depo__who strong { display: block; font-weight: 500; color: var(--black); }
.depo__who span { color: var(--muted); }
.depo__arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border: 1px solid var(--champagne); border-radius: 50%; color: var(--black); display: flex; align-items: center; justify-content: center; transition: all var(--dur) var(--ease); }
.depo__arrow:hover { background: var(--black); color: var(--cream); border-color: var(--black); }
.depo__arrow--prev { left: 0; }
.depo__arrow--next { right: 0; }
.depo__dots { display: flex; gap: 8px; justify-content: center; margin-top: var(--space-md); }
.depo__dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(201, 169, 110, 0.4); transition: background var(--dur) var(--ease); }
.depo__dot[aria-selected="true"] { background: var(--caramel); }

@media (max-width: 600px) {
  .depo__carousel { padding: 0 var(--space-lg); }
  .depo__arrow { width: 40px; height: 40px; }
}
```

- [ ] **Step 3: Preencher `initCarousel()`**

```javascript
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
```

- [ ] **Step 4: Verificar**

Carrossel mostra 1 depoimento de cada vez. Setas navegam. Dots clicáveis. Auto-advance a cada 7s. Pausa no hover.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js
git commit -m "feat: carrossel de depoimentos com auto-advance"
```

---

## Task 10: Grid Instagram

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: HTML**

```html
<section class="insta" aria-labelledby="insta-title">
  <div class="container">
    <div class="insta__header" data-reveal>
      <span class="label">@dra.carolsegura · 52,3k seguidores</span>
      <h2 id="insta-title" class="h-serif insta__title">Siga o <em class="italic">bastidor</em>.</h2>
    </div>
    <div class="insta__grid" data-reveal>
      <a class="insta__tile" href="https://www.instagram.com/dra.carolsegura/" target="_blank" rel="noopener"><img src="imagens/colagem.webp" alt="Post Instagram" loading="lazy" width="400" height="400"><span class="insta__overlay">@dra.carolsegura →</span></a>
      <a class="insta__tile" href="https://www.instagram.com/dra.carolsegura/" target="_blank" rel="noopener"><img src="imagens/colagem-2.webp" alt="Post Instagram" loading="lazy" width="400" height="400"><span class="insta__overlay">@dra.carolsegura →</span></a>
      <a class="insta__tile" href="https://www.instagram.com/dra.carolsegura/" target="_blank" rel="noopener"><img src="imagens/colagem-3.webp" alt="Post Instagram" loading="lazy" width="400" height="400"><span class="insta__overlay">@dra.carolsegura →</span></a>
      <a class="insta__tile" href="https://www.instagram.com/seguraecompany/" target="_blank" rel="noopener"><img src="imagens/colagem-4.webp" alt="Post Instagram" loading="lazy" width="400" height="400"><span class="insta__overlay">@seguraecompany →</span></a>
      <a class="insta__tile" href="https://www.instagram.com/seguraecompany/" target="_blank" rel="noopener"><img src="imagens/foto-marca-conceitual.webp" alt="Post Instagram" loading="lazy" width="400" height="400"><span class="insta__overlay">@seguraecompany →</span></a>
      <a class="insta__tile" href="https://www.instagram.com/seguraecompany/" target="_blank" rel="noopener"><img src="imagens/seguraeco.webp" alt="Post Instagram" loading="lazy" width="400" height="400"><span class="insta__overlay">@seguraecompany →</span></a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
/* === Instagram === */
.insta { padding: var(--space-xl) 0; background: var(--cream); }
.insta__header { text-align: center; max-width: 720px; margin: 0 auto var(--space-lg); }
.insta__title { font-size: clamp(30px, 4vw, 44px); margin-top: var(--space-sm); }
.insta__grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; }
.insta__tile { position: relative; aspect-ratio: 1 / 1; overflow: hidden; display: block; }
.insta__tile img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s var(--ease); }
.insta__overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(26, 26, 26, 0.6); color: var(--cream); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; opacity: 0; transition: opacity var(--dur) var(--ease); }
.insta__tile:hover .insta__overlay { opacity: 1; }
.insta__tile:hover img { transform: scale(1.06); }

@media (max-width: 900px) {
  .insta__grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 600px) {
  .insta__grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Verificar + Commit**

```bash
git add index.html styles.css
git commit -m "feat: grid Instagram com 6 posts"
```

---

## Task 11: Contato + formulário

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js` (preencher `initForm()`)

- [ ] **Step 1: HTML**

```html
<section id="contato" class="contato" aria-labelledby="contato-title">
  <div class="container">
    <div class="contato__grid">
      <div class="contato__info" data-reveal>
        <span class="label">Agendamento</span>
        <h2 id="contato-title" class="h-serif contato__title">Vamos <em class="italic">conversar</em>.</h2>
        <p class="contato__sub">Escolha o formato que preferir. Retornamos em até 24h úteis.</p>
        <dl class="contato__list">
          <div><dt>Clínica</dt><dd>Catanduva-SP · Brasil</dd></div>
          <div><dt>WhatsApp</dt><dd><a href="https://wa.me/5517999999999">+55 (17) 99999-9999</a></dd></div>
          <div><dt>E-mail</dt><dd><a href="mailto:contato@seguraeco.com">contato@seguraeco.com</a></dd></div>
          <div><dt>Instagram</dt><dd><a href="https://www.instagram.com/seguraecompany/" target="_blank" rel="noopener">@seguraecompany</a> · <a href="https://www.instagram.com/dra.carolsegura/" target="_blank" rel="noopener">@dra.carolsegura</a></dd></div>
          <div><dt>Horários</dt><dd>Segunda a sexta · 9h às 19h</dd></div>
        </dl>
      </div>
      <form class="contato__form" id="contato-form" data-reveal novalidate>
        <label class="field">
          <span>Nome</span>
          <input type="text" name="nome" required autocomplete="name">
        </label>
        <label class="field">
          <span>WhatsApp</span>
          <input type="tel" name="whatsapp" required autocomplete="tel" placeholder="(17) 99999-9999">
        </label>
        <label class="field">
          <span>Procedimento de interesse</span>
          <select name="procedimento" required>
            <option value="">Selecione</option>
            <option>Harmonização Facial</option>
            <option>Rinomodelação</option>
            <option>Preenchimento Labial</option>
            <option>Botox</option>
            <option>Bioestimuladores (PDRN)</option>
            <option>Tratamento de Olheiras</option>
            <option>Bichectomia</option>
            <option>Lipo de Papada</option>
            <option>LAVIEEN</option>
            <option>Cursos VIP (profissional)</option>
            <option>Outro</option>
          </select>
        </label>
        <label class="field">
          <span>Mensagem</span>
          <textarea name="mensagem" rows="4"></textarea>
        </label>
        <button type="submit" class="btn btn-primary contato__submit">Enviar</button>
        <p class="contato__status" id="contato-status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
/* === Contato === */
.contato { padding: var(--space-xl) 0; background: #F5EFE7; }
.contato__grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); align-items: start; }
.contato__title { font-size: clamp(32px, 4vw, 48px); margin-top: var(--space-sm); }
.contato__sub { font-size: 16px; color: var(--brown); margin-top: var(--space-md); max-width: 420px; }
.contato__list { margin-top: var(--space-lg); display: grid; gap: var(--space-md); }
.contato__list > div { display: grid; grid-template-columns: 120px 1fr; gap: var(--space-md); padding-bottom: var(--space-sm); border-bottom: 1px solid rgba(201, 169, 110, 0.3); }
.contato__list dt { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--caramel); font-weight: 500; }
.contato__list dd { font-size: 15px; color: var(--black); }
.contato__list a { border-bottom: 1px solid transparent; transition: border-color var(--dur) var(--ease); }
.contato__list a:hover { border-color: var(--caramel); color: var(--caramel); }
.contato__form { background: var(--cream); padding: var(--space-lg); display: grid; gap: var(--space-md); border: 1px solid rgba(201, 169, 110, 0.4); }
.field { display: grid; gap: 6px; }
.field span { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--caramel); font-weight: 500; }
.field input, .field select, .field textarea {
  font: inherit; font-size: 15px; color: var(--black);
  padding: 12px 0; border: none; border-bottom: 1px solid rgba(26, 26, 26, 0.2);
  background: transparent; transition: border-color var(--dur) var(--ease);
  resize: vertical;
}
.field textarea { min-height: 80px; }
.field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: var(--caramel); }
.field input:invalid:not(:placeholder-shown), .field select:invalid:not([value=""]) { border-color: #B44; }
.contato__submit { margin-top: var(--space-sm); justify-self: start; }
.contato__status { font-size: 13px; color: var(--brown); min-height: 20px; }
.contato__status.is-error { color: #B44; }
.contato__status.is-ok { color: var(--caramel); }

@media (max-width: 900px) {
  .contato__grid { grid-template-columns: 1fr; gap: var(--space-lg); }
  .contato__list > div { grid-template-columns: 100px 1fr; }
}
```

- [ ] **Step 3: Preencher `initForm()`**

```javascript
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
```

- [ ] **Step 4: Verificar**

Desktop: duas colunas. Form com campos line-underline minimalistas. Submeter sem campos obrigatórios mostra erro inline. Submeter OK abre cliente de e-mail com corpo preenchido.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js
git commit -m "feat: contato com lista de info e formulário mailto"
```

---

## Task 12: Footer

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: HTML**

Antes de `<script src="script.js" defer>`:

```html
<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <div class="footer__logo">
        <span class="footer__logo-script">Segura</span><span class="footer__logo-italic">&nbsp;&amp;&nbsp;Co.</span>
      </div>
      <p class="footer__tag">Harmonizando com naturalidade, ciência & sensibilidade.</p>
    </div>
    <nav class="footer__nav" aria-label="Rodapé">
      <a href="#sobre">Sobre</a>
      <a href="#servicos">Serviços</a>
      <a href="#cursos">Cursos</a>
      <a href="#clinica">Clínica</a>
      <a href="#contato">Contato</a>
    </nav>
    <div class="footer__social">
      <a href="https://www.instagram.com/seguraecompany/" target="_blank" rel="noopener">@seguraecompany</a>
      <a href="https://www.instagram.com/dra.carolsegura/" target="_blank" rel="noopener">@dra.carolsegura</a>
      <a href="https://linktr.ee/carolsegura" target="_blank" rel="noopener">linktr.ee/carolsegura</a>
    </div>
  </div>
  <div class="footer__meta container">
    <span>CROSP 109060 · Dra. Carol Segura</span>
    <span>© 2026 Segura & Co · Todos os direitos reservados</span>
  </div>
</footer>
```

- [ ] **Step 2: CSS**

```css
/* === Footer === */
.footer { background: var(--black); color: var(--cream); padding: var(--space-xl) 0 var(--space-lg); }
.footer__inner { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: var(--space-xl); align-items: start; }
.footer__logo { display: inline-flex; align-items: baseline; gap: 4px; }
.footer__logo-script { font-family: var(--font-script); font-size: 42px; line-height: 1; }
.footer__logo-italic { font-family: var(--font-serif); font-style: italic; font-size: 22px; }
.footer__tag { margin-top: var(--space-sm); font-size: 14px; color: rgba(250, 246, 241, 0.7); max-width: 320px; font-style: italic; }
.footer__nav { display: flex; flex-direction: column; gap: var(--space-sm); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
.footer__nav a { color: rgba(250, 246, 241, 0.8); transition: color var(--dur) var(--ease); }
.footer__nav a:hover { color: var(--champagne); }
.footer__social { display: flex; flex-direction: column; gap: var(--space-sm); font-size: 13px; }
.footer__social a { color: rgba(250, 246, 241, 0.8); border-bottom: 1px solid transparent; transition: all var(--dur) var(--ease); align-self: flex-start; }
.footer__social a:hover { color: var(--champagne); border-color: var(--champagne); }
.footer__meta { display: flex; justify-content: space-between; gap: var(--space-md); margin-top: var(--space-xl); padding-top: var(--space-md); border-top: 1px solid rgba(250, 246, 241, 0.15); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(250, 246, 241, 0.5); }

@media (max-width: 900px) {
  .footer__inner { grid-template-columns: 1fr; gap: var(--space-lg); }
  .footer__meta { flex-direction: column; align-items: flex-start; gap: var(--space-xs); }
}
```

- [ ] **Step 3: Verificar + Commit**

```bash
git add index.html styles.css
git commit -m "feat: footer com logo script e meta"
```

---

## Task 13: Polish — acessibilidade, responsivo 320px, reveal

**Files:**
- Modify: `index.html` (ajustes acessibilidade)
- Modify: `styles.css` (tweaks responsivos finais)

- [ ] **Step 1: Audit acessibilidade manual**

Checklist:
- [ ] Todas as imagens com `alt` descritivo (ou `alt=""` se decorativas)
- [ ] `<h1>` único (só o do hero)
- [ ] `<h2>` por seção com `aria-labelledby`
- [ ] Contraste: texto escuro sobre creme → OK; texto `var(--brown)` #5A4A42 sobre #FAF6F1 → verificar com DevTools Lighthouse (deve ser ≥ 7:1)
- [ ] Formulário: todo input tem `<label>` associado via `<span>` dentro de `<label>`
- [ ] Navegação por teclado: Tab passa por todos links/botões sem pular; focus visível

Adicionar foco visível em `styles.css`:

```css
/* === Foco acessível === */
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--caramel);
  outline-offset: 3px;
}
```

- [ ] **Step 2: Testar 320px de largura**

DevTools → responsive → 320px. Verificar cada seção:
- Navbar não overflow
- Hero: texto + foto empilhados, foto 70vh
- Serviços: 1 coluna
- Clínica mosaico: 1 coluna, tiles 240px
- Contato: stack, dt/dd legíveis
- Footer: stack

Se qualquer quebra, adicionar regra `@media (max-width: 380px)` tratando o caso específico.

- [ ] **Step 3: Adicionar skip link**

Logo após `<body>`:

```html
<a class="skip" href="#home">Pular para o conteúdo</a>
```

CSS:

```css
.skip { position: absolute; top: -40px; left: 16px; padding: 8px 16px; background: var(--black); color: var(--cream); z-index: 200; transition: top var(--dur) var(--ease); }
.skip:focus { top: 16px; }
```

- [ ] **Step 4: Lighthouse audit**

Abrir DevTools → Lighthouse → desktop + mobile. Esperado: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.

Se Accessibility falhar: ler issues, corrigir labels ausentes / contraste.
Se Performance falhar: verificar se fontes usam `display=swap` e imagens têm `loading="lazy"` fora do hero.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "chore: acessibilidade, skip link e polish responsivo 320px"
```

---

## Task 14: QA final e entrega

- [ ] **Step 1: Checklist de aceite (spec §7)**

- [ ] Abrir `index.html` direto no navegador funciona (sem servidor)
- [ ] Zero lorem ipsum
- [ ] Mobile 320px perfeito
- [ ] Todos assets de `imagens/` referenciados e carregam
- [ ] Logo "Segura & Co." renderiza com Parisienne
- [ ] Formulário abre `mailto:` com corpo preenchido
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 90
- [ ] Sem erros no console
- [ ] Fontes carregam do Google Fonts

- [ ] **Step 2: Cross-browser quick check**

Testar Chrome, Firefox, Edge (se disponível). Verificar:
- Grid funciona (incluindo `aspect-ratio`)
- `backdrop-filter` no navbar (fallback: fundo sólido se indisponível — já coberto por `rgba()`)
- Fontes carregam

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "chore: QA final — site pronto para publicar"
```

---

## Notas finais

- **Sem git init?** Se `git` não estiver inicializado, pular comandos `git commit` ou rodar `git init` no Task 1 Step 5. Site ainda funciona.
- **Imagens da Dra. Juliana:** A spec usa `foto-doutora-2.jpg` como placeholder para a Dra. Juliana, mas ambas as fotos disponíveis parecem ser da Dra. Carol. Confirmar com a usuária qual arquivo usar — se só houver uma doutora com foto, considerar card único ou usar `colagem-2.jpg`/`colagem-3.jpg` como fallback estilizado.
- **Depoimentos fictícios:** Textos realistas mas inventados. Se a usuária tiver depoimentos reais (prints em `feedback-1.jpg`/`feedback-2.jpg`), trocar por uma seção de "prints reais" em vez do carrossel textual.
- **WhatsApp/email placeholders:** `+55 17 99999-9999` e `contato@seguraeco.com` devem ser substituídos pelos reais antes de publicar.
