'use strict';
/**
 * Реальні роботи "До / Після". Додавайте нові пари фото сюди —
 * вони автоматично зʼявляться на сторінці "Галерея" після
 * `node build/generate.js`.
 *
 * before/after — шлях до файлу в /images. Якщо у вас одне комбіноване
 * фото (де "до" і "після" вже в одному кадрі), вкажіть його в полі
 * `combined`, а `before`/`after` залиште порожніми.
 */

const gallery = [
  {
    id: 'lips-1',
    service: 'lip-contouring',
    title: 'Контурна пластика губ',
    combined: 'photo_2026-08-04_22-31-37.jpg',
    note: 'Природний об’єм і чіткий контур',
  },
  {
    id: 'lips-2',
    service: 'lip-contouring',
    title: 'Контурна пластика губ',
    combined: 'photo_2026-08-04_22-31-39.jpg',
    note: 'Гармонійна форма без ефекту «перекачаних» губ',
  },
  {
    id: 'botox-1',
    service: 'botox',
    title: 'Ботулінотерапія',
    combined: 'photo_2026-08-04_22-31-44.jpg',
    note: 'Розгладження мімічних зморшок лоба',
  },
  {
    id: 'meso-1',
    service: 'face-mesotherapy',
    title: 'Мезотерапія обличчя',
    combined: 'photo_2026-08-04_22-31-40.jpg',
    note: 'Стан шкіри до і одразу після процедури',
  },
  {
    id: 'biorevit-1',
    service: 'biorevitalization',
    title: 'Біоревіталізація',
    combined: 'photo_2026-08-04_22-31-42.jpg',
    note: 'Відновлення тонусу та сяйва шкіри (очі приховано з міркувань приватності)',
  },
  {
    id: 'lips-3',
    service: 'lip-contouring',
    title: 'Контурна пластика губ',
    combined: 'result-lips-1.JPEG',
    note: 'Природний об’єм і чіткіший контур',
  },
  {
    id: 'lips-4',
    service: 'lip-contouring',
    title: 'Контурна пластика губ',
    combined: 'result-lips-2.JPEG',
    note: 'Корекція форми та об’єму губ',
  },
  {
    id: 'lips-5',
    service: 'lip-contouring',
    title: 'Контурна пластика губ',
    combined: 'result-lips-3.JPEG',
    note: 'Виразний, доглянутий контур губ',
  },
  {
    id: 'lips-6',
    service: 'lip-contouring',
    title: 'Контурна пластика губ',
    combined: 'result-lips-4.JPEG',
    note: 'Природний об’єм без ефекту «качиних губ»',
  },
  {
    id: 'lips-7',
    service: 'lip-contouring',
    title: 'Контурна пластика губ',
    combined: 'result-lips-5.JPEG',
    note: 'Гармонійна форма та чіткий контур',
  },
  {
    id: 'blanching-1',
    service: 'blanching',
    title: 'Бланшинг дермальних заломів',
    combined: 'result-blanching-1.JPEG',
    note: 'Вирівнювання рельєфу шкіри в ділянці ока',
  },
  {
    id: 'face-contour-1',
    service: 'face-contouring',
    title: 'Контурна пластика обличчя',
    combined: 'result-face-contouring-1.JPEG',
    note: 'Корекція об’єму та контуру нижньої третини обличчя',
  },
  {
    id: 'meso-2',
    service: 'face-mesotherapy',
    title: 'Мезотерапія обличчя',
    combined: 'result-mesotherapy-1.JPEG',
    note: 'Стан шкіри одразу після процедури',
  },
];

module.exports = gallery;
