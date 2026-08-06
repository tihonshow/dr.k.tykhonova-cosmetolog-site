'use strict';
/**
 * Загальні дані сайту: бренд, контакти, локації, навігація.
 * Змінюйте значення тут — вони автоматично підтягнуться на всі сторінки
 * після повторного запуску `node build/generate.js`.
 */

const site = {
  brandName: 'Dr. Kristina Tykhonova',
  brandFull: 'Кристина Тихонова',
  brandRole: 'Лікар-косметолог',
  tagline: 'Підкреслюємо природну красу — без втрати індивідуальності',
  descriptionShort:
    'Лікар-косметолог Кристина Тихонова. Ін’єкційна косметологія, відновлення якості шкіри та антивікові процедури у Харкові та Миргороді.',
  yearFounded: 2020,
  currentYear: 2026,

  phoneDisplay: '093 898 78 71',
  phoneRaw: '+380938987871',
  telegramHandle: '@kris_tykhonova_7',
  telegramUrl: 'https://t.me/kris_tykhonova_7',
  instagramHandle: '@dr_k.tykhonova_',
  instagramUrl: 'https://instagram.com/dr_k.tykhonova_',
  viberUrl: 'viber://chat?number=%2B380938987871',

  locations: [
    {
      city: 'Харків',
      place: 'вул. Георгія Тарасенка, 92А',
      mapQuery: 'вул. Георгія Тарасенка, 92А, Харків',
    },
    {
      city: 'Миргород',
      place: 'вул. Гоголя, 118',
      mapQuery: 'вул. Гоголя, 118, Миргород, Полтавська область',
    },
  ],

  workHours: 'Прийом за попереднім записом',

  nav: [
    { label: 'Про мене', href: '/about.html' },
    { label: 'Послуги', href: '/services.html', hasMega: true },
    { label: 'Сертифікати', href: '/certificates.html' },
    { label: 'Галерея', href: '/gallery.html' },
    { label: 'Відгуки', href: '/reviews.html' },
    { label: 'Прайс', href: '/price.html' },
    { label: 'Контакти', href: '/contacts.html' },
  ],

  categories: [
    { id: 'injection', title: 'Ін’єкційні процедури', short: 'Ін’єкційні' },
    { id: 'meso', title: 'Мезотерапія', short: 'Мезотерапія' },
    { id: 'hardware', title: 'Апаратні та відновлювальні процедури', short: 'Апаратні' },
    { id: 'consult', title: 'Консультація', short: 'Консультація' },
  ],
};

module.exports = site;
