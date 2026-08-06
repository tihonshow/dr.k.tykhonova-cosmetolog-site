'use strict';

const site = require('./data/site');
const icons = require('./icons');

/* ---------------------------------------------------------- helpers */

// ctx = { base: '' | '../' }  — depth-aware path prefix
const ctx = (depth) => ({ base: depth ? '../' : '' });
const asset = (c, p) => c.base + p;
const img = (c, name) => c.base + 'images/' + name;
const svcUrl = (c, slug) => c.base + 'services/' + slug + '.html';
const pageUrl = (c, name) => c.base + name;

const money = (n) => n; // placeholder passthrough for future formatting

/* ---------------------------------------------------------- <head> */

function head(c, { title, description, canonicalPath }) {
  const fullTitle = title.includes(site.brandName) ? title : `${title} | ${site.brandName}`;
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${fullTitle}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="https://tykhonova-cosmetology.ua/${canonicalPath}">
<meta name="theme-color" content="#0A2C42">
<link rel="icon" type="image/png" href="${img(c, 'logo.PNG')}">
<meta property="og:type" content="website">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${img(c, 'photo_2026-08-04_22-31-32.jpg')}">
<meta property="og:locale" content="uk_UA">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="${asset(c, 'css/style.css')}">
<script type="application/ld+json">${JSON.stringify(orgSchema(c))}</script>`;
}

function orgSchema(c) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: site.brandName,
    image: 'https://tykhonova-cosmetology.ua/images/photo_2026-08-04_22-31-32.jpg',
    telephone: site.phoneRaw,
    medicalSpecialty: 'Cosmetology',
    sameAs: [site.instagramUrl, site.telegramUrl],
    address: site.locations.map((l) => ({
      '@type': 'PostalAddress',
      addressLocality: l.city,
      addressCountry: 'UA',
      streetAddress: l.place,
    })),
  };
}

/* ---------------------------------------------------------- buttons */

function btn(label, href, { variant = 'primary', icon = null, extra = '', target = '' } = {}) {
  const t = target ? ` target="_blank" rel="noopener"` : '';
  const ic = icon ? `<span class="btn-ic">${icons[icon]}</span>` : '';
  return `<a class="btn btn-${variant} ${extra}" href="${href}"${t}>${ic}<span>${label}</span></a>`;
}

function contactTrio(c, { variant = 'default', size = '' } = {}) {
  return `<div class="contact-trio ${variant} ${size}">
    ${btn('Telegram', site.telegramUrl, { variant: 'accent', icon: 'telegram', target: '_blank', extra: 'trio-btn' })}
    ${btn('Viber', site.viberUrl, { variant: 'ghost-trio', icon: 'viber', extra: 'trio-btn' })}
    ${btn(site.phoneDisplay, `tel:${site.phoneRaw}`, { variant: 'ghost-trio', icon: 'phone', extra: 'trio-btn' })}
  </div>`;
}

/* ---------------------------------------------------------- header */

function headerNav(c, active, activeService) {
  const groups = site.categories
    .map((cat) => {
      const items = require('./data/services')
        .filter((s) => s.category === cat.id)
        .map(
          (s) => `<a href="${svcUrl(c, s.slug)}" class="mega-link ${activeService === s.slug ? 'is-active' : ''}">${s.title}</a>`
        )
        .join('');
      return `<div class="mega-col"><p class="mega-cat">${cat.title}</p>${items}</div>`;
    })
    .join('');

  const navLinks = site.nav
    .map((n) => {
      const key = n.href.replace(/^\//, '').replace('.html', '') || 'home';
      const isActive = active === key;
      if (n.hasMega) {
        return `<li class="has-mega">
          <a href="${pageUrl(c, 'services.html')}" class="${isActive ? 'is-active' : ''}">${n.label}<span class="mega-caret">${icons.chevron}</span></a>
          <div class="mega-menu"><div class="mega-grid">${groups}</div>
            <div class="mega-foot"><a href="${pageUrl(c, 'services.html')}">Усі послуги ${icons.arrow}</a></div>
          </div>
        </li>`;
      }
      return `<li><a href="${pageUrl(c, n.href.slice(1))}" class="${isActive ? 'is-active' : ''}">${n.label}</a></li>`;
    })
    .join('');

  return navLinks;
}

function header(c, active = '', activeService = '') {
  return `<header class="site-header" id="siteHeader">
  <div class="header-inner container">
    <a href="${pageUrl(c, 'index.html')}" class="brand" aria-label="${site.brandName} — головна">
      <img src="${img(c, 'logo.PNG')}" alt="${site.brandName}" class="brand-logo">
    </a>

    <nav class="main-nav" aria-label="Основна навігація">
      <ul>${headerNav(c, active, activeService)}</ul>
    </nav>

    <div class="header-actions">
      <a class="header-phone" href="tel:${site.phoneRaw}">${icons.phone}<span>${site.phoneDisplay}</span></a>
      <a class="btn btn-primary btn-sm" href="${site.telegramUrl}" target="_blank" rel="noopener">Записатися</a>
      <button class="burger" id="burgerBtn" aria-label="Відкрити меню" aria-expanded="false" aria-controls="mobileNav">
        ${icons.menu}
      </button>
    </div>
  </div>
</header>
${mobileNav(c)}`;
}

// Rendered as a SIBLING of <header>, not nested inside it — .site-header uses
// backdrop-filter, which turns it into the containing block for any
// position:fixed descendant. If .mobile-nav lived inside <header>, its
// `inset: var(--header-h) 0 0 0` would resolve against the ~84px-tall header
// box instead of the viewport, collapsing the open menu into an empty strip.
function mobileNav(c) {
  return `<div class="mobile-nav" id="mobileNav">
    <div class="mobile-nav-inner">
      <ul class="mobile-links">
        <li><a href="${pageUrl(c, 'index.html')}">Головна</a></li>
        <li><a href="${pageUrl(c, 'about.html')}">Про мене</a></li>
        <li class="mobile-services">
          <button class="mobile-services-toggle" aria-expanded="false">Послуги ${icons.chevron}</button>
          <div class="mobile-services-list">
            ${require('./data/services')
              .map((s) => `<a href="${svcUrl(c, s.slug)}">${s.title}</a>`)
              .join('')}
          </div>
        </li>
        <li><a href="${pageUrl(c, 'certificates.html')}">Сертифікати</a></li>
        <li><a href="${pageUrl(c, 'gallery.html')}">Галерея</a></li>
        <li><a href="${pageUrl(c, 'reviews.html')}">Відгуки</a></li>
        <li><a href="${pageUrl(c, 'price.html')}">Прайс</a></li>
        <li><a href="${pageUrl(c, 'contacts.html')}">Контакти</a></li>
      </ul>
      ${contactTrio(c, { variant: 'stack' })}
    </div>
  </div>`;
}

/* ---------------------------------------------------------- footer */

function footer(c) {
  const svcList = require('./data/services')
    .slice(0, 8)
    .map((s) => `<li><a href="${svcUrl(c, s.slug)}">${s.title}</a></li>`)
    .join('');

  const locs = site.locations
    .map(
      (l) => `<li>${icons.pin}<span><strong>${l.city}</strong><br>${l.place}</span></li>`
    )
    .join('');

  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <img src="${img(c, 'logo.PNG')}" alt="${site.brandName}" class="footer-logo">
      <p>${site.brandRole.toLowerCase()} · ${site.brandFull}. ${site.tagline}.</p>
      <div class="footer-social">
        <a href="${site.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">${icons.instagram}</a>
        <a href="${site.telegramUrl}" target="_blank" rel="noopener" aria-label="Telegram">${icons.telegram}</a>
      </div>
    </div>

    <div class="footer-col">
      <h4>Навігація</h4>
      <ul>
        <li><a href="${pageUrl(c, 'about.html')}">Про мене</a></li>
        <li><a href="${pageUrl(c, 'certificates.html')}">Сертифікати</a></li>
        <li><a href="${pageUrl(c, 'gallery.html')}">Галерея робіт</a></li>
        <li><a href="${pageUrl(c, 'reviews.html')}">Відгуки</a></li>
        <li><a href="${pageUrl(c, 'price.html')}">Прайс</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Послуги</h4>
      <ul>${svcList}</ul>
      <a class="footer-all" href="${pageUrl(c, 'services.html')}">Усі послуги ${icons.arrow}</a>
    </div>

    <div class="footer-col">
      <h4>Контакти</h4>
      <ul class="footer-contacts">
        <li><a href="tel:${site.phoneRaw}">${icons.phone}<span>${site.phoneDisplay}</span></a></li>
        <li><a href="${site.telegramUrl}" target="_blank" rel="noopener">${icons.telegram}<span>${site.telegramHandle}</span></a></li>
        <li><a href="${site.instagramUrl}" target="_blank" rel="noopener">${icons.instagram}<span>${site.instagramHandle}</span></a></li>
      </ul>
      <ul class="footer-locations">${locs}</ul>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p>© ${site.currentYear} ${site.brandName}. Усі права захищено.</p>
      <p class="footer-disclaimer">Інформація на сайті має ознайомчий характер і не є публічною офертою. Перелік протипоказань уточнюйте на консультації.</p>
    </div>
  </div>
</footer>

<div class="dock" aria-label="Швидкий зв'язок">
  <a class="dock-btn dock-tg" href="${site.telegramUrl}" target="_blank" rel="noopener" aria-label="Написати в Telegram">${icons.telegram}</a>
  <a class="dock-btn dock-viber" href="${site.viberUrl}" aria-label="Написати у Viber">${icons.viber}</a>
  <a class="dock-btn dock-call" href="tel:${site.phoneRaw}" aria-label="Зателефонувати">${icons.phone}</a>
</div>

<div class="lightbox" id="lightbox"><button class="lightbox-close" id="lightboxClose" aria-label="Закрити">${icons.close}</button><img id="lightboxImg" src="" alt=""></div>`;
}

/* ---------------------------------------------------------- page shell */

function layout(c, { title, description, canonicalPath, active = '', activeService = '', bodyClass = '', content }) {
  return `<!DOCTYPE html>
<html lang="uk">
<head>
${head(c, { title, description, canonicalPath })}
</head>
<body class="${bodyClass}">
${header(c, active, activeService)}
<main>
${content}
</main>
${footer(c)}
<script src="${asset(c, 'js/main.js')}" defer></script>
</body>
</html>`;
}

/* ---------------------------------------------------------- reusable blocks */

function breadcrumbs(c, items) {
  const parts = items
    .map((it, i) =>
      it.href
        ? `<a href="${it.href}">${it.label}</a>`
        : `<span aria-current="page">${it.label}</span>`
    )
    .join('<span class="crumb-sep">/</span>');
  return `<nav class="breadcrumbs container" aria-label="Хлібні крихти">${parts}</nav>`;
}

function sectionHead({ kicker, title, text, align = '' }) {
  return `<div class="section-head ${align}">
    ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
    <h2>${title}</h2>
    ${text ? `<p class="section-text">${text}</p>` : ''}
  </div>`;
}

function quickFacts(qf) {
  return `<ul class="quick-facts">
    <li>${icons.clock}<div><span>Тривалість</span><strong>${qf.duration}</strong></div></li>
    <li>${icons.sparkle}<div><span>Ефект</span><strong>${qf.effect}</strong></div></li>
    <li>${icons.shield}<div><span>Відновлення</span><strong>${qf.downtime}</strong></div></li>
  </ul>`;
}

function checklist(items, iconName = 'check') {
  return `<ul class="checklist">${items
    .map((it) => `<li>${icons[iconName]}<span>${it}</span></li>`)
    .join('')}</ul>`;
}

function stepsList(steps) {
  return `<ol class="steps-list">${steps
    .map(
      (s, i) => `<li><span class="step-num">${String(i + 1).padStart(2, '0')}</span><div><h3>${s.title}</h3><p>${s.text}</p></div></li>`
    )
    .join('')}</ol>`;
}

function faqBlock(items, idPrefix = 'faq') {
  return `<div class="faq-list">${items
    .map(
      (f, i) => `<div class="faq-item">
        <button class="faq-q" id="${idPrefix}-btn-${i}" aria-expanded="false" aria-controls="${idPrefix}-panel-${i}">
          <span>${f.q}</span>${icons.plus}
        </button>
        <div class="faq-a" id="${idPrefix}-panel-${i}" role="region" aria-labelledby="${idPrefix}-btn-${i}">
          <p>${f.a}</p>
        </div>
      </div>`
    )
    .join('')}</div>`;
}

function serviceCard(c, s) {
  return `<a class="service-card" href="${svcUrl(c, s.slug)}">
    <div class="service-card-top">
      <span class="service-card-icon">${icons.syringe}</span>
      <span class="service-card-arrow">${icons.arrow}</span>
    </div>
    <h3>${s.title}</h3>
    <p>${s.shortDesc}</p>
  </a>`;
}

function ctaBand(c, { kicker = 'Записатися на прийом', title = 'Обговоримо ваш ідеальний результат', text = 'Оберіть зручний спосіб зв’язку — відповім особисто та підберу оптимальну процедуру.', size = '' } = {}) {
  return `<section class="cta-band ${size}">
    <div class="container cta-band-inner">
      <div>
        <p class="kicker kicker-light">${kicker}</p>
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
      ${contactTrio(c, { variant: 'light' })}
    </div>
  </section>`;
}

function relatedServices(c, services, currentSlug, count = 3) {
  const list = services.filter((s) => s.slug !== currentSlug).slice(0, count);
  return `<section class="related">
    <div class="container">
      ${sectionHead({ kicker: 'Також може зацікавити', title: 'Суміжні процедури' })}
      <div class="service-grid">${list.map((s) => serviceCard(c, s)).join('')}</div>
    </div>
  </section>`;
}

function lightboxTrigger(src, alt, extraClass = '') {
  return `<button class="lightbox-trigger ${extraClass}" data-src="${src}" aria-label="Збільшити зображення"><img src="${src}" alt="${alt}" loading="lazy"></button>`;
}

module.exports = {
  ctx,
  asset,
  img,
  svcUrl,
  pageUrl,
  layout,
  header,
  footer,
  breadcrumbs,
  sectionHead,
  quickFacts,
  checklist,
  stepsList,
  faqBlock,
  serviceCard,
  ctaBand,
  relatedServices,
  contactTrio,
  btn,
  lightboxTrigger,
  icons,
  site,
};
