'use strict';
/**
 * Мінімалістичні лінійні SVG-іконки (stroke = currentColor).
 * Один набір іконок використовується по всьому сайту.
 */

const icons = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 4h3.2l1.6 4.3-2 1.6a12.5 12.5 0 0 0 6.8 6.8l1.6-2 4.3 1.6V19a2 2 0 0 1-2.1 2A17 17 0 0 1 3 5.1 2 2 0 0 1 4.5 4Z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4 3 11.2l6 2.2M21 4l-3.2 16-6.8-5M21 4 10.8 13.4M9 13.4V18l2.7-2.6"/></svg>`,
  viber: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5c-4.7 0-8.2 3-8.2 7.6 0 2.6 1.2 4.8 3.2 6.2l-.6 3.2 3.4-1.4c.7.2 1.4.3 2.2.3 4.7 0 8.2-3 8.2-7.6s-3.5-8.3-8.2-8.3Z"/><path d="M9 9.3c0 3.5 2.6 6 6 6.3.6 0 .9-.5.7-1l-.7-1.6c-.2-.4-.6-.5-1-.4l-1 .4c-1-.6-1.9-1.5-2.4-2.5l.4-1c.1-.3 0-.8-.4-1L9.9 7.7c-.5-.2-1-.1-1.2.5-.2.5-.2.7-.2 1.1Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.3"/><path d="M12 7.5V12l3 2"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 3.5 13.7 9l5.3 1.7-5.3 1.8L12 18l-1.7-5.5L5 10.7 10.3 9 12 3.5Z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 19 6.3v5.4c0 4.6-3 7.7-7 8.8-4-1.1-7-4.2-7-8.8V6.3L12 3.5Z"/><path d="m9.3 12 1.9 1.9L15 10"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8 4.5-13.5 14-14 .3 9.5-5.5 14-14 14Z"/><path d="M6 18c3-3.5 5.5-6.5 12.5-11.5"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7.5-4.8-9.8-9.6C.6 6.8 2.6 3.5 6 3.2c2.1-.2 4 1 6 3.3 2-2.3 3.9-3.5 6-3.3 3.4.3 5.4 3.6 3.8 7.2C19.5 15.2 12 20 12 20Z"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.3 6.5C6 8 4.3 10.6 4.3 13.9c0 2.6 1.6 4.4 3.7 4.4 1.9 0 3.3-1.4 3.3-3.3 0-1.7-1.1-3-2.7-3.3.3-1.6 1.6-3 3.3-3.7l-2.6-1.5Zm9.4 0c-3.3 1.5-5 4.1-5 7.4 0 2.6 1.6 4.4 3.7 4.4 1.9 0 3.3-1.4 3.3-3.3 0-1.7-1.1-3-2.7-3.3.3-1.6 1.6-3 3.3-3.7l-2.6-1.5Z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  drop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5s6 6.6 6 11a6 6 0 1 1-12 0c0-4.4 6-11 6-11Z"/></svg>`,
  syringe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m20 4-2.5 2.5M14.5 6 18 9.5 9.5 18 5 19l1-4.5L14.5 6Z"/><path d="m12 8.5 3.5 3.5M4 20l1.5-1.5"/></svg>`,
  spark2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v4M4 6h4M17 13v5M14.5 15.5h5M11 3l1.3 3.7L16 8l-3.7 1.3L11 13l-1.3-3.7L6 8l3.7-1.3L11 3Z"/></svg>`,
};

module.exports = icons;
