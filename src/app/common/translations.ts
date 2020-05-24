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
  ['full_time', 'Полный рабочий день'],
  ['part_time', '30 часов в неделю'],
  ['half_time', '20 часов в неделю']
]);

export const experience = new Map([
  ['low','До 3 лет'],
  ['middle','3-5 лет'],
  ['high','Более 5 лет']
]);

export const schedule = new Map([
  ['five_days', '5 через 2'],
  ['shift_work', 'Сменный'],
  ['watch','Вахтовый']
]);
