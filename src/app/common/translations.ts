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

export const employement = new Map([
  ['full_time', 'Полная'],
  ['part_time', 'Частичная']
]);

export const experience = new Map([
  ['less_5', 'Менее 5 лет'],
  ['more_5', 'Более 5 лет']
]);

export const schedule = new Map([
  ['full_day', 'Полный рабочий день'],
  ['0.75', '30 часов в неделю'],
  ['0.5', '20 часов в неделю']
]);
