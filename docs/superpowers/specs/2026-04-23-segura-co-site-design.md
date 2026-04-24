# Segura & Co — Site institucional (spec de design)

**Data:** 2026-04-23
**Projeto:** Site single-page para clínica Segura & Co (Catanduva-SP + Miami)
**Entregável técnico:** `index.html` + `styles.css` + `script.js` estáticos, sem build step

---

## 1. Marca

- **Nome:** Segura & Co (@seguraecompany)
- **Fundadoras:** Dra. Carol Segura (CROSP 109060, 13 anos, verificada, @dra.carolsegura, 52,3k seguidores) e Dra. Juliana Segura (@drajulianasegura), irmãs
- **Segmento:** Harmonização facial de alto padrão + formação de profissionais injetores
- **Localização:** Catanduva-SP + atendimento/cursos em Miami-EUA
- **Tagline oficial:** "Harmonizando com naturalidade, ciência & sensibilidade há 13 anos."
- **Public ICP:**
  - Pacientes: mulheres 25-55 buscando procedimentos estéticos naturais
  - Profissionais: dentistas/médicas injetoras buscando cursos avançados

## 2. Tom de voz

Sofisticado, feminino, acolhedor, científico. **Naturalidade** como valor central — nunca "transformação radical" ou "antes/depois dramático". Frases curtas. Termos técnicos (ácido hialurônico, bioestimulador, PDRN, toxina botulínica) usados com parcimônia pra credibilidade.

## 3. Identidade visual

### Paleta (ajustada pra combinar com assets reais)

| Uso | Nome | Hex |
|---|---|---|
| Background principal | Off-white cream | `#FAF6F1` |
| Acento primário / highlights | Caramelo queimado | `#B87333` |
| Acento secundário / hairlines | Dourado champanhe | `#C9A96E` |
| Nude/rosé (detalhes suaves) | Rosé empoeirado | `#D9B8A4` |
| Texto corpo | Marrom-neutro | `#5A4A42` |
| Texto primário / CTA sólido | Preto carvão | `#1A1A1A` |

Decisão: **bordô substituído por caramelo queimado** pra harmonizar com fotos reais (sofá caramelo, madeira clara, jaleco verde-oliva).

### Tipografia

- **Logo:** `Parisienne` (Google Fonts) — script cursivo, replicando letreiro real da clínica. "Segura" em script + "& Co." em Playfair Display itálico.
- **Títulos:** `Playfair Display` — serif elegante, pesos 400/600, itálico pra palavras-chave ("ciência", "naturalidade")
- **Corpo:** `Inter` — pesos 300/400/500
- **Labels/tags:** `Inter` 10-11px, letter-spacing 3-4px, uppercase

### Estética

- Muito espaço em branco, layouts assimétricos refinados
- Hairlines douradas (#C9A96E) como detalhe decorativo nos cantos
- Transições suaves (0.4s ease), hover states discretos
- Microinterações: fade-in on scroll (IntersectionObserver), parallax leve no hero
- Grid 12 colunas desktop / stack mobile
- Breakpoints: 1200 / 900 / 600 / 320

## 4. Arquitetura — single-page unificado

Público único na mesma página (pacientes + profissionais), diferenciados por CTAs e seção dedicada de cursos.

### Seções (ordem final)

1. **Navbar fixa** — logo script "Segura & Co." à esquerda, links à direita (Sobre / Serviços / Cursos / Clínica / Contato), CTA preto sólido "AGENDAR".
2. **Hero split editorial** (aprovado visualmente):
   - Coluna esquerda (55%): label "EST. 2013 · CATANDUVA · MIAMI" → headline Playfair 54px "Beleza com *ciência*. Resultado com *naturalidade*." → subheadline → 2 CTAs (AGENDAR CONSULTA preto / CURSOS VIP outline).
   - Coluna direita (45%): `foto-doutora.jpg` full-bleed com assinatura Parisienne sobreposta "Dra. Carol Segura".
   - Hairline dourada nos cantos.
3. **Sobre as doutoras** — duas colunas (50/50) com foto + bio curta de cada irmã. Usar `foto-doutora-2.jpg` e uma segunda foto (placeholder/Instagram). CROSP, anos de experiência, Brasil + EUA, posicionamento irmãs.
4. **Serviços** — grid 3x3 (desktop) → 1 col (mobile). Cards minimal: ícone SVG inline, título Playfair, 1-2 linhas descrição, link sutil "Saiba mais →". Lista:
   1. Harmonização Facial
   2. Rinomodelação
   3. Preenchimento Labial
   4. Botox (toxina botulínica)
   5. Bioestimuladores (PDRN)
   6. Tratamento de Olheiras
   7. Bichectomia
   8. Lipo de Papada
   9. LAVIEEN (usar `maquina-lavieen.jpg` como imagem card destacado)
5. **Filosofia / Três pilares** — bloco horizontal com 3 pilares (Ciência / Naturalidade / Sensibilidade), ícones hairline, texto curto cada.
6. **Cursos VIP** — faixa full-width background escuro (#1A1A1A) ou caramelo. Texto branco. Fala do Curso RINO e Curso VIP Naturalidade. Usar `curso-1.jpg` ou `foto-curso-1.jpg`. CTA: "Entrar na lista de espera →".
7. **Clínica** — galeria 6 imagens em grid assimétrico (mosaic) usando `foto-clinica-interna-1..11.jpg` + `escada-lustres.jpg` + `foto-espaco-marca.jpg`. Breve texto sobre inauguração (late 2025) e espaço em Catanduva.
8. **Depoimentos** — carrossel simples (3-5 slides). Usar `feedback-1.jpg` e `feedback-2.jpg` como prova social real (prints de mensagens). Navegação por dots.
9. **Instagram feed** — grid 6 posts placeholder (fotos da pasta: `colagem.jpg`, `colagem-2.jpg`, `colagem-3.jpg`, `colagem-4.jpg`, `foto-marca-conceitual.jpg`, `seguraeco.jpg`). Overlay hover "@dra.carolsegura" + CTA "Ver no Instagram →".
10. **Contato / Agendamento** — duas colunas:
    - Esquerda: endereço Catanduva-SP, WhatsApp (placeholder `+55 17 99999-9999`), Instagram @seguraecompany + @dra.carolsegura, email `contato@seguraeco.com` (placeholder), horários.
    - Direita: formulário (nome, WhatsApp, procedimento de interesse via `<select>` com todos serviços, mensagem, botão "ENVIAR"). Submit via `mailto:` para MVP.
11. **Footer** — logo script, redes sociais, "CROSP 109060 · Dra. Carol Segura", "© 2026 Segura & Co", link `linktr.ee/carolsegura`.

## 5. Mapeamento de assets reais

Pasta: `imagens/` (já populada pela usuária)

| Seção | Arquivos |
|---|---|
| Hero | `foto-doutora.jpg` |
| Sobre doutoras | `foto-doutora-2.jpg` + (segunda foto pra Juliana — placeholder se ausente) |
| Serviços (LAVIEEN) | `maquina-lavieen.jpg` |
| Cursos VIP | `curso-1.jpg`, `curso-2.jpg`, `foto-curso-1.jpg` |
| Clínica (galeria) | `foto-clinica-interna-1.jpg` até `-11.jpg`, `escada-lustres.jpg`, `foto-espaco-marca.jpg` |
| Depoimentos | `feedback-1.jpg`, `feedback-2.jpg` |
| Instagram grid | `colagem.jpg`, `colagem-2.jpg`, `colagem-3.jpg`, `colagem-4.jpg`, `foto-marca-conceitual.jpg`, `seguraeco.jpg` |

## 6. Requisitos técnicos

- HTML5 semântico + CSS3 + JS vanilla (zero frameworks, zero build)
- Fontes via Google Fonts (`Parisienne`, `Playfair Display`, `Inter`)
- 100% responsivo (mobile-first, perfeito até 320px)
- Acessibilidade: contraste WCAG AA, `aria-label` em ícones, navegação por teclado, respeitar `prefers-reduced-motion`
- Performance: CSS crítico inline no `<head>`, `loading="lazy"` em imagens abaixo da fold, `<img>` com `width`/`height` para evitar layout shift
- SEO: `<title>`, meta description, Open Graph tags, `schema.org/MedicalClinic` JSON-LD com CROSP, endereço, redes
- JS: scroll suave, animações on-scroll (IntersectionObserver), menu mobile hamburger, validação simples do form
- Comentários em pt-BR em seções-chave do CSS e JS

## 7. Critérios de aceite

1. Abrir `index.html` no navegador local funciona sem servidor
2. Zero lorem ipsum — todos os textos finais em pt-BR, coerentes com tom
3. Visual premium consistente com clínicas de estética de luxo (Sisley, Valmont, Dr. Barbara Sturm como referência de polimento)
4. Mobile-first perfeito em 320px
5. Todos os assets da pasta `imagens/` referenciados corretamente
6. Logo script "Segura & Co." renderiza com Parisienne fallback
7. Formulário envia via `mailto:` sem JS error
8. Lighthouse ≥ 90 em Performance e Accessibility

## 8. Fora de escopo (MVP)

- Backend/CMS/admin
- Blog
- Área de aluno / LMS pra cursos
- Sistema real de agendamento (integração calendário)
- i18n (versão em inglês pra Miami) — futuro
- Analytics (GA/Meta Pixel) — adicionar quando usuária fornecer IDs
