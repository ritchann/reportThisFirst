export const status = new Map([
  ['pending', 'Ожидание'],
  ['postponed', 'Отложено'],
  ['in_progress', 'В процессе'],
  ['investigation', 'Исследуется'],
  ['resolved', 'Решена']
]);

export const type = new Map([
  ['gas', 'Газ'],
  ['water', 'Вода'],
  ['electricity', 'Электричество'],
  ['heat', 'Теплоснабжение']
]);

export const priority = new Map([
  ['very_low', 'Очень низкий'],
  ['low', 'Низкий'],
  ['medium', 'Средний'],
  ['high', 'Высокий'],
  ['critical', 'Критический']
]);
