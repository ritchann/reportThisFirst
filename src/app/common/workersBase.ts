import { ServiceType } from "data/enum";

type Worker = { name: string, profession: string, type: string, checked: boolean };

export const workers: { [key: string]: Worker } = {
  0: { name: 'Иванов Иван Иванович', profession: 'Электрик', type: ServiceType.Electricity, checked: true },
  1: { name: 'Сергеев Сергей Сергеевич', profession: 'Сварщик', type: ServiceType.Gas, checked: false },
  2: { name: 'Петров Петр Петрович', profession: 'Сантехник', type: ServiceType.Water, checked: false },
  3: { name: 'Александров Александр Александрович', profession: 'Электрик', type: ServiceType.Electricity, checked: false },
  4: { name: 'Николаев Николай Николаевич', profession: 'Сантехник', type: ServiceType.Water, checked: false },
  // 5: { name: 'Артемов Артем Артемович', profession: 'Сварщик', type: ServiceType.Gas, checked: false },
  // 6: { name: 'Алексеев Алексей Алексеевич', profession: 'Электрик', type: ServiceType.Electricity, checked: false },
  // 7: { name: 'Глебов Глеб Глебович', profession: 'Сантехник', type: ServiceType.Water, checked: false },
  // 8: { name: 'Степанов Степан Степанович', profession: 'Сварщик', type: ServiceType.Gas, checked: false }
};