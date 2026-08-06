'use strict';
/**
 * Прайс. Щоб додати ціну послуги — впишіть її навпроти slug'а
 * (slug такий самий, як у build/data/services.js) і запустіть
 * `node build/generate.js`. Послуги без ціни автоматично покажуть
 * позначку «уточнюється» з кнопками запису.
 *
 * Приклад:
 *   'lip-contouring': 'від 3 000 грн',
 */

const priceOverrides = {
  // 'lip-contouring': 'від 3 000 грн',
};

module.exports = priceOverrides;
