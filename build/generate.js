'use strict';

const fs = require('fs');
const path = require('path');

const T = require('./templates');
const site = require('./data/site');
const services = require('./data/services');
const gallery = require('./data/gallery');
const certificates = require('./data/certificates');
const priceOverrides = require('./data/prices');
const icons = require('./icons');

const ROOT = path.join(__dirname, '..');

function write(rel, html) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, 'utf8');
  console.log('  ✓', rel);
}

const findService = (slug) => services.find((s) => s.slug === slug);

/* ============================================================ HOME */

function pageHome() {
  const c = T.ctx(0);
  const popularSlugs = [
    'lip-contouring',
    'face-contouring',
    'botox',
    'biorevitalization',
    'microneedle-rf',
    'face-mesotherapy',
    'peels',
    'consultation',
  ];
  const popular = popularSlugs.map(findService);

  const valueCards = [
    { icon: 'leaf', title: 'Природний результат', text: 'Підкреслюємо вашу індивідуальність, а не змінюємо її.' },
    { icon: 'shield', title: 'Безпека і стерильність', text: 'Сертифіковані препарати та протоколи стерильності на кожному етапі.' },
    { icon: 'sparkle', title: 'Індивідуальний підхід', text: 'План процедур будується під ваше обличчя, а не за шаблоном.' },
    { icon: 'heart', title: 'Досвід з 2020 року', text: 'Регулярне навчання та практика в сучасній естетичній медицині.' },
  ];

  const content = `
  <section class="hero" style="--hero-img:url('${T.img(c, 'photo_2026-08-04_22-31-32.jpg')}')">
    <div class="hero-overlay"></div>
    <div class="container hero-inner">
      <p class="kicker kicker-light">Лікар-косметолог · з ${site.yearFounded} року</p>
      <h1>${site.brandName}</h1>
      <p class="hero-lead">${site.tagline}</p>
      <p class="hero-sub">Ін’єкційна косметологія, відновлення якості шкіри та антивікові процедури у Харкові та Миргороді.</p>
      <div class="hero-actions">
        ${T.contactTrio(c, { variant: 'light' })}
      </div>
      <a class="hero-scroll" href="#services-teaser">Переглянути послуги ${icons.arrow}</a>
    </div>
    <div class="hero-badges">
      <div class="container hero-badges-inner">
        <span>${icons.check} Досвід з ${site.yearFounded} року</span>
        <span>${icons.check} Вища медична освіта</span>
        <span>${icons.check} Індивідуальний підхід</span>
      </div>
    </div>
  </section>

  <section class="about-teaser">
    <div class="container about-teaser-grid">
      <div class="about-teaser-media">
        <img src="${T.img(c, 'photo_2026-08-04_22-31-35.jpg')}" alt="${site.brandFull} на прийомі" loading="lazy">
      </div>
      <div class="about-teaser-text">
        ${T.sectionHead({ kicker: 'Про лікаря', title: 'Кристина Іванівна Тихонова' })}
        <p>Лікар-косметолог, працює у сфері естетичної медицини з ${site.yearFounded} року. Має вищу медичну освіту та регулярно підвищує кваліфікацію на профільних семінарах, навчаннях і майстер-класах.</p>
        <p>Спеціалізується на ін’єкційній косметології, відновленні якості шкіри, антивікових процедурах та індивідуальному підборі програми догляду для кожного клієнта.</p>
        ${T.btn('Дізнатися більше', T.pageUrl(c, 'about.html'), { variant: 'outline' })}
      </div>
    </div>
  </section>

  <section class="section-alt" id="services-teaser">
    <div class="container">
      ${T.sectionHead({ kicker: 'Послуги', title: 'Ключові напрямки роботи', text: 'Повний перелік процедур — ін’єкційна косметологія, мезотерапія та апаратні методики відновлення шкіри.', align: 'center' })}
      <div class="service-grid">${popular.map((s) => T.serviceCard(c, s)).join('')}</div>
      <div class="section-cta">${T.btn('Усі послуги', T.pageUrl(c, 'services.html'), { variant: 'primary', icon: 'arrow' })}</div>
    </div>
  </section>

  <section class="values">
    <div class="container">
      ${T.sectionHead({ kicker: 'Чому обирають', title: 'Головна ідея бренду', text: 'Підкреслення природної краси без втрати індивідуальності.', align: 'center' })}
      <div class="values-grid">
        ${valueCards
          .map(
            (v) => `<div class="value-card"><span class="value-icon">${icons[v.icon]}</span><h3>${v.title}</h3><p>${v.text}</p></div>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section-alt gallery-teaser">
    <div class="container">
      ${T.sectionHead({ kicker: 'Результати', title: 'Роботи До / Після', align: 'center' })}
      <div class="gallery-grid gallery-grid-teaser">
        ${gallery
          .slice(0, 3)
          .map(
            (g) => `<div class="gallery-card">
              ${T.lightboxTrigger(T.img(c, g.combined), g.title)}
              <div class="gallery-card-info"><h3>${g.title}</h3><p>${g.note}</p></div>
            </div>`
          )
          .join('')}
      </div>
      <div class="section-cta">${T.btn('Уся галерея', T.pageUrl(c, 'gallery.html'), { variant: 'outline', icon: 'arrow' })}</div>
    </div>
  </section>

  <section class="edu-teaser">
    <div class="container edu-teaser-grid">
      <div class="edu-teaser-text">
        ${T.sectionHead({ kicker: 'Розвиток', title: 'Навчання та підвищення кваліфікації' })}
        <p>Сучасна естетична медицина постійно розвивається — тому навчання є невіддільною частиною роботи. Регулярна участь у профільних конференціях, семінарах та майстер-класах дозволяє впроваджувати перевірені та актуальні протоколи.</p>
        ${T.btn('Сертифікати та навчання', T.pageUrl(c, 'certificates.html'), { variant: 'outline' })}
      </div>
      <div class="edu-teaser-media">
        <img src="${T.img(c, 'photo_2026-08-04_22-31-19.jpg')}" alt="Профільна конференція" loading="lazy">
      </div>
    </div>
  </section>

  <section class="section-alt locations">
    <div class="container">
      ${T.sectionHead({ kicker: 'Локації', title: 'Де мене знайти', align: 'center' })}
      <div class="locations-grid">
        ${site.locations
          .map(
            (l) => `<a class="location-card" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.mapQuery)}" target="_blank" rel="noopener">
              <span class="location-icon">${icons.pin}</span>
              <div><h3>${l.city}</h3><p>${l.place}</p></div>
              <span class="location-arrow">${icons.arrow}</span>
            </a>`
          )
          .join('')}
      </div>
    </div>
  </section>

  ${T.ctaBand(c)}
  `;

  write(
    'index.html',
    T.layout(c, {
      title: `${site.brandName} — лікар-косметолог`,
      description: site.descriptionShort,
      canonicalPath: '',
      active: 'home',
      content,
    })
  );
}

/* ============================================================ ABOUT */

function pageAbout() {
  const c = T.ctx(0);
  const content = `
  ${T.breadcrumbs(c, [{ label: 'Головна', href: T.pageUrl(c, 'index.html') }, { label: 'Про мене' }])}

  <section class="page-hero page-hero-split">
    <div class="container page-hero-split-grid">
      <div class="page-hero-media">
        <img src="${T.img(c, 'photo_2026-08-04_22-31-32.jpg')}" alt="${site.brandFull}, лікар-косметолог" loading="eager">
      </div>
      <div class="page-hero-text">
        <p class="kicker">Про мене</p>
        <h1>Кристина Іванівна Тихонова</h1>
        <p class="hero-lead-dark">Лікар-косметолог</p>
        <p>Працюю у сфері косметології з ${site.yearFounded} року. Маю вищу медичну освіту та регулярно підвищую кваліфікацію, відвідуючи професійні семінари, навчання та майстер-класи з сучасної естетичної медицини.</p>
        ${T.contactTrio(c)}
      </div>
    </div>
  </section>

  <section class="section-narrow">
    <div class="container">
      ${T.sectionHead({ kicker: 'Спеціалізація', title: 'На чому я фокусуюсь' })}
      <div class="about-focus-grid">
        <div class="focus-card"><span>${icons.syringe}</span><h3>Ін’єкційна косметологія</h3><p>Контурна пластика, ботулінотерапія, біоревіталізація та інші ін’єкційні методики.</p></div>
        <div class="focus-card"><span>${icons.drop}</span><h3>Відновлення якості шкіри</h3><p>Мезотерапія, пілінги, апаратні методики для щільної та здорової шкіри.</p></div>
        <div class="focus-card"><span>${icons.spark2}</span><h3>Антивікові процедури</h3><p>Комплексний підхід до профілактики та корекції вікових змін.</p></div>
        <div class="focus-card"><span>${icons.heart}</span><h3>Індивідуальний підхід</h3><p>Кожен план будується під анатомію, побажання та стан шкіри клієнта.</p></div>
      </div>
    </div>
  </section>

  <section class="section-alt philosophy">
    <div class="container philosophy-inner">
      <span class="quote-icon">${icons.quote}</span>
      <p class="philosophy-text">Підкреслення природної краси без втрати індивідуальності</p>
      <p class="philosophy-sub">Це головна ідея, якою я керуюсь у роботі з кожним клієнтом — результат має виглядати як ви, тільки відпочилі, доглянуті й впевнені.</p>
    </div>
  </section>

  <section class="section-narrow">
    <div class="container">
      ${T.sectionHead({ kicker: 'Навчання', title: 'Постійний професійний розвиток', text: 'Естетична медицина швидко змінюється — регулярна участь у конференціях і навчаннях дозволяє працювати за актуальними протоколами.' })}
      <div class="about-gallery">
        <img src="${T.img(c, 'photo_2026-08-04_22-31-19.jpg')}" alt="Профільна конференція" loading="lazy">
        <img src="${T.img(c, 'photo_2026-08-04_22-31-16.jpg')}" alt="Навчальний захід" loading="lazy">
        <img src="${T.img(c, 'photo_2026-08-04_22-31-35.jpg')}" alt="На прийомі" loading="lazy">
        <img src="${T.img(c, 'IMG_2358.JPG')}" alt="${site.brandFull}" loading="lazy">
        <img src="${T.img(c, 'portrait-2.JPG')}" alt="${site.brandFull}, лікар-косметолог" loading="lazy">
        <img src="${T.img(c, 'portrait-3.JPG')}" alt="${site.brandFull}" loading="lazy">
        <img src="${T.img(c, 'conference-1.PNG')}" alt="Профільна конференція" loading="lazy">
      </div>
      <div class="section-cta">${T.btn('Сертифікати та навчання', T.pageUrl(c, 'certificates.html'), { variant: 'outline', icon: 'arrow' })}</div>
    </div>
  </section>

  ${T.ctaBand(c, { title: 'Готові розпочати?', text: 'Запишіться на консультацію — розробимо індивідуальний план догляду саме для вас.' })}
  `;

  write(
    'about.html',
    T.layout(c, {
      title: 'Про мене',
      description: `Кристина Тихонова — лікар-косметолог з ${site.yearFounded} року. Вища медична освіта, регулярне підвищення кваліфікації, індивідуальний підхід.`,
      canonicalPath: 'about.html',
      active: 'about',
      content,
    })
  );
}

/* ============================================================ CERTIFICATES */

function pageCertificates() {
  const c = T.ctx(0);
  const content = `
  ${T.breadcrumbs(c, [{ label: 'Головна', href: T.pageUrl(c, 'index.html') }, { label: 'Сертифікати' }])}

  <section class="page-hero page-hero-simple">
    <div class="container">
      <p class="kicker">Освіта та кваліфікація</p>
      <h1>Сертифікати та навчання</h1>
      <p class="page-hero-lead">Вища медична освіта та регулярне підвищення кваліфікації на профільних семінарах, навчаннях і майстер-класах із сучасної естетичної медицини.</p>
    </div>
  </section>

  <section class="section-narrow">
    <div class="container">
      <div class="cert-grid">
        ${certificates
          .map(
            (cert) => `<figure class="cert-card">
              ${T.lightboxTrigger(T.img(c, cert.img), cert.title)}
              <figcaption><h3>${cert.title}</h3><p>${cert.text}</p></figcaption>
            </figure>`
          )
          .join('')}
      </div>
      <p class="cert-note">Перелік сертифікатів і фото з навчань поповнюється — актуальні документи можна також уточнити особисто на консультації.</p>
    </div>
  </section>

  ${T.ctaBand(c)}
  `;

  write(
    'certificates.html',
    T.layout(c, {
      title: 'Сертифікати та навчання',
      description: 'Освіта, сертифікати та участь у профільних конференціях лікаря-косметолога Крістіни Тихонової.',
      canonicalPath: 'certificates.html',
      active: 'certificates',
      content,
    })
  );
}

/* ============================================================ GALLERY */

function pageGallery() {
  const c = T.ctx(0);
  const content = `
  ${T.breadcrumbs(c, [{ label: 'Головна', href: T.pageUrl(c, 'index.html') }, { label: 'Галерея' }])}

  <section class="page-hero page-hero-simple">
    <div class="container">
      <p class="kicker">Реальні роботи</p>
      <h1>Галерея До / Після</h1>
      <p class="page-hero-lead">Фотографії реальних клієнток. Деякі фото частково приховані з міркувань приватності.</p>
    </div>
  </section>

  <section class="section-narrow">
    <div class="container">
      <div class="gallery-grid">
        ${gallery
          .map((g) => {
            const s = findService(g.service);
            return `<div class="gallery-card">
              ${T.lightboxTrigger(T.img(c, g.combined), g.title)}
              <div class="gallery-card-info">
                <h3>${g.title}</h3>
                <p>${g.note}</p>
                ${s ? `<a class="gallery-card-link" href="${T.svcUrl(c, s.slug)}">Про процедуру ${icons.arrow}</a>` : ''}
              </div>
            </div>`;
          })
          .join('')}
      </div>
    </div>
  </section>

  ${T.ctaBand(c, { title: 'Хочете такий самий результат?', text: 'Запишіться на консультацію — обговоримо ваш запит і підберемо процедуру.' })}
  `;

  write(
    'gallery.html',
    T.layout(c, {
      title: 'Галерея робіт До / Після',
      description: 'Реальні результати процедур: контурна пластика губ, ботулінотерапія, біоревіталізація та мезотерапія.',
      canonicalPath: 'gallery.html',
      active: 'gallery',
      content,
    })
  );
}

/* ============================================================ REVIEWS */

function pageReviews() {
  const c = T.ctx(0);

  const reviewsDir = path.join(ROOT, 'images', 'reviews');
  const reviewImages = fs.existsSync(reviewsDir)
    ? fs
        .readdirSync(reviewsDir)
        .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
        .sort((a, b) => a.localeCompare(b, 'uk', { numeric: true }))
    : [];

  const photosOrEmpty = reviewImages.length
    ? `<div class="reviews-photo-grid">${reviewImages
        .map(
          (name, i) => `<figure class="reviews-photo-card">
            ${T.lightboxTrigger(c.base + 'images/reviews/' + name, `Відгук пацієнтки — скріншот ${i + 1} з ${reviewImages.length}`)}
          </figure>`
        )
        .join('')}</div>`
    : `<div class="empty-state">
          <span class="empty-icon">${icons.quote}</span>
          <h3>Незабаром тут з’являться відгуки клієнтів</h3>
          <p>Ми дбаємо про те, щоб на сайті були лише справжні враження наших клієнток. А поки що більше реальних результатів і кадрів з процедур — в Instagram.</p>
          <div class="empty-actions">
            ${T.btn('Instagram', site.instagramUrl, { variant: 'outline', icon: 'instagram', target: '_blank' })}
            ${T.btn('Залишити відгук у Telegram', site.telegramUrl, { variant: 'primary', icon: 'telegram', target: '_blank' })}
          </div>
        </div>`;

  const content = `
  ${T.breadcrumbs(c, [{ label: 'Головна', href: T.pageUrl(c, 'index.html') }, { label: 'Відгуки' }])}

  <section class="page-hero page-hero-simple">
    <div class="container">
      <p class="kicker">Довіра клієнтів</p>
      <h1>Відгуки пацієнтів</h1>
      <p class="page-hero-lead">Реальні повідомлення та результати наших клієнтів.</p>
    </div>
  </section>

  <section class="section-narrow">
    <div class="container">${photosOrEmpty}</div>
  </section>

  ${T.ctaBand(c, { title: 'Записатися на консультацію', text: 'Оберіть зручний спосіб зв’язку — відповім особисто та підберу оптимальну процедуру.' })}
  `;

  write(
    'reviews.html',
    T.layout(c, {
      title: 'Відгуки пацієнтів',
      description: 'Реальні відгуки та результати пацієнтів лікаря-косметолога Крістіни Тихонової.',
      canonicalPath: 'reviews.html',
      active: 'reviews',
      content,
    })
  );
}

/* ============================================================ PRICE */

function pagePrice() {
  const c = T.ctx(0);

  const pricesDir = path.join(ROOT, 'images', 'prices');
  const priceImages = fs.existsSync(pricesDir)
    ? fs
        .readdirSync(pricesDir)
        .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
        .sort((a, b) => a.localeCompare(b, 'uk', { numeric: true }))
    : [];

  const gallery = priceImages
    .map(
      (name, i) => `<figure class="price-gallery-item">
        ${T.lightboxTrigger(c.base + 'images/prices/' + name, `Прайс — сторінка ${i + 1} з ${priceImages.length}`)}
        <figcaption>Сторінка ${i + 1} з ${priceImages.length}</figcaption>
      </figure>`
    )
    .join('');

  const content = `
  ${T.breadcrumbs(c, [{ label: 'Головна', href: T.pageUrl(c, 'index.html') }, { label: 'Прайс' }])}

  <section class="page-hero page-hero-simple">
    <div class="container">
      <p class="kicker">Вартість процедур</p>
      <h1>Прайс</h1>
      <p class="page-hero-lead">Кінцева вартість завжди залежить від об’єму робіт, кількості препарату та індивідуального плану, тому формується на консультації. Нижче — актуальний прайс-лист.</p>
    </div>
  </section>

  <section class="section-alt price-gallery-section">
    <div class="container">
      <div class="price-gallery">${gallery}</div>
    </div>
  </section>

  ${T.ctaBand(c, { kicker: 'Дізнатись вартість', title: 'Записатися на консультацію', text: 'Напишіть кілька слів про побажання — розкажу орієнтовну вартість і підберу зручну дату візиту ще до зустрічі.', size: 'cta-band-xl' })}
  `;

  write(
    'price.html',
    T.layout(c, {
      title: 'Прайс на послуги',
      description: 'Орієнтовний перелік послуг косметолога Крістіни Тихонової. Точна вартість — на консультації.',
      canonicalPath: 'price.html',
      active: 'price',
      content,
    })
  );
}

/* ============================================================ CONTACTS */

function pageContacts() {
  const c = T.ctx(0);

  const locCards = site.locations
    .map(
      (l) => `<div class="contact-location-card">
        <div class="contact-location-head"><span>${icons.pin}</span><div><h3>${l.city}</h3><p>${l.place}</p></div></div>
        <div class="map-embed">
          <iframe src="https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Карта: ${l.city}, ${l.place}"></iframe>
        </div>
        <a class="btn btn-outline btn-sm" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.mapQuery)}" target="_blank" rel="noopener">Прокласти маршрут ${icons.arrow}</a>
      </div>`
    )
    .join('');

  const content = `
  ${T.breadcrumbs(c, [{ label: 'Головна', href: T.pageUrl(c, 'index.html') }, { label: 'Контакти' }])}

  <section class="page-hero page-hero-simple">
    <div class="container">
      <p class="kicker">Завжди на звʼязку</p>
      <h1>Контакти</h1>
      <p class="page-hero-lead">Оберіть зручний спосіб зв’язку — відповім особисто протягом дня.</p>
    </div>
  </section>

  <section class="section-narrow">
    <div class="container contacts-grid">
      <a class="contact-method" href="tel:${site.phoneRaw}">
        <span>${icons.phone}</span><div><h3>Телефон</h3><p>${site.phoneDisplay}</p></div>
      </a>
      <a class="contact-method" href="${site.telegramUrl}" target="_blank" rel="noopener">
        <span>${icons.telegram}</span><div><h3>Telegram</h3><p>${site.telegramHandle}</p></div>
      </a>
      <a class="contact-method" href="${site.viberUrl}">
        <span>${icons.viber}</span><div><h3>Viber</h3><p>${site.phoneDisplay}</p></div>
      </a>
      <a class="contact-method" href="${site.instagramUrl}" target="_blank" rel="noopener">
        <span>${icons.instagram}</span><div><h3>Instagram</h3><p>${site.instagramHandle}</p></div>
      </a>
    </div>
  </section>

  <section class="section-alt">
    <div class="container">
      ${T.sectionHead({ kicker: 'Локації', title: 'Кабінети прийому', text: site.workHours, align: 'center' })}
      <div class="contact-locations-grid">${locCards}</div>
    </div>
  </section>

  ${T.ctaBand(c)}
  `;

  write(
    'contacts.html',
    T.layout(c, {
      title: 'Контакти',
      description: `Контакти лікаря-косметолога Крістіни Тихонової: телефон, Telegram, Instagram, кабінети у Харкові та Миргороді.`,
      canonicalPath: 'contacts.html',
      active: 'contacts',
      content,
    })
  );
}

/* ============================================================ SERVICES HUB */

function pageServicesHub() {
  const c = T.ctx(0);
  const groups = site.categories
    .map((cat) => {
      const list = services.filter((s) => s.category === cat.id);
      return `<div class="services-hub-group" id="${cat.id}">
        <h2>${cat.title}</h2>
        <div class="service-grid">${list.map((s) => T.serviceCard(c, s)).join('')}</div>
      </div>`;
    })
    .join('');

  const content = `
  ${T.breadcrumbs(c, [{ label: 'Головна', href: T.pageUrl(c, 'index.html') }, { label: 'Послуги' }])}

  <section class="page-hero page-hero-simple">
    <div class="container">
      <p class="kicker">Перелік процедур</p>
      <h1>Послуги</h1>
      <p class="page-hero-lead">Ін’єкційна косметологія, мезотерапія та апаратні методики відновлення шкіри — оберіть напрямок або перейдіть до опису конкретної процедури.</p>
    </div>
  </section>

  <section class="section-narrow">
    <div class="container">${groups}</div>
  </section>

  ${T.ctaBand(c, { title: 'Не знаєте, що обрати?', text: 'Запишіться на консультацію — підберу процедуру саме під ваш запит.' })}
  `;

  write(
    'services.html',
    T.layout(c, {
      title: 'Послуги',
      description: 'Повний перелік послуг: контурна пластика, ботулінотерапія, біоревіталізація, мезотерапія, апаратні методики та консультація.',
      canonicalPath: 'services.html',
      active: 'services',
      content,
    })
  );
}

/* ============================================================ SERVICE PAGE */

function pageService(s) {
  const c = T.ctx(1);
  const cat = site.categories.find((x) => x.id === s.category);

  const proofSection = s.proof && s.proof.length
    ? `<section class="section-narrow">
        <div class="container">
          ${T.sectionHead({ kicker: 'Реальні роботи', title: s.proofCaption || 'До і після' })}
          <div class="gallery-grid">
            ${s.proof.map((p) => `<div class="gallery-card">${T.lightboxTrigger(T.img(c, p), s.title)}</div>`).join('')}
          </div>
        </div>
      </section>`
    : '';

  const content = `
  ${T.breadcrumbs(c, [
    { label: 'Головна', href: T.pageUrl(c, 'index.html') },
    { label: 'Послуги', href: T.pageUrl(c, 'services.html') },
    { label: cat.title, href: T.pageUrl(c, 'services.html') + '#' + cat.id },
    { label: s.title },
  ])}

  <section class="service-hero" style="--hero-img:url('${T.img(c, s.heroBg)}')">
    <div class="hero-overlay"></div>
    <div class="container service-hero-inner">
      <p class="kicker kicker-light">${cat.title}</p>
      <h1>${s.title}</h1>
      <p class="hero-lead">${s.lead}</p>
      ${T.quickFacts(s.quickFacts)}
      <div class="hero-actions">${T.contactTrio(c, { variant: 'light' })}</div>
    </div>
  </section>

  <section class="section-narrow">
    <div class="container service-desc">
      ${s.description.map((p) => `<p>${p}</p>`).join('')}
    </div>
  </section>

  <section class="section-alt">
    <div class="container two-col">
      <div>
        ${T.sectionHead({ kicker: 'Коли варто', title: 'Показання' })}
        ${T.checklist(s.indications)}
      </div>
      <div>
        ${T.sectionHead({ kicker: 'Результат', title: 'Переваги процедури' })}
        ${T.checklist(s.benefits, 'sparkle')}
      </div>
    </div>
  </section>

  <section class="section-narrow">
    <div class="container">
      ${T.sectionHead({ kicker: 'Як проходить', title: 'Етапи проведення' })}
      ${T.stepsList(s.steps)}
    </div>
  </section>

  ${proofSection}

  <section class="section-alt">
    <div class="container">
      ${T.sectionHead({ kicker: 'Питання та відповіді', title: 'Поширені запитання' })}
      ${T.faqBlock(s.faq, s.slug)}
    </div>
  </section>

  <section class="section-narrow">
    <div class="container price-inline">
      <div>
        <h3>Вартість процедури «${s.title}»</h3>
        <p>${priceOverrides[s.slug] ? priceOverrides[s.slug] : 'Вартість формується індивідуально після консультації.'}</p>
      </div>
      ${T.btn('Переглянути прайс', T.pageUrl(c, 'price.html'), { variant: 'outline' })}
    </div>
  </section>

  ${T.relatedServices(c, services, s.slug)}

  ${T.ctaBand(c, { title: `Записатися на «${s.title}»`, text: 'Оберіть зручний спосіб зв’язку — узгодимо дату та відповім на всі запитання.' })}
  `;

  write(
    `services/${s.slug}.html`,
    T.layout(c, {
      title: s.metaTitle,
      description: s.shortDesc,
      canonicalPath: `services/${s.slug}.html`,
      active: 'services',
      activeService: s.slug,
      content,
    })
  );
}

/* ============================================================ SEO files */

function writeSeoFiles() {
  const urls = ['index.html', 'about.html', 'services.html', 'certificates.html', 'gallery.html', 'reviews.html', 'price.html', 'contacts.html', ...services.map((s) => `services/${s.slug}.html`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>https://tykhonova-cosmetology.ua/${u === 'index.html' ? '' : u}</loc></url>`).join('\n')}
</urlset>`;
  write('sitemap.xml', sitemap);
  write('robots.txt', `User-agent: *\nAllow: /\nSitemap: https://tykhonova-cosmetology.ua/sitemap.xml\n`);
}

/* ============================================================ RUN */

console.log('Генерація сторінок сайту Dr. Kristina Tykhonova…\n');
pageHome();
pageAbout();
pageCertificates();
pageGallery();
pageReviews();
pagePrice();
pageContacts();
pageServicesHub();
services.forEach(pageService);
writeSeoFiles();
console.log('\nГотово: ' + (8 + services.length) + ' сторінок.');
