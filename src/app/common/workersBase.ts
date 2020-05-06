import { ServiceType } from "data/enum";
import { Employee } from "data/employee/model";

export const workers: { [key: string]: Employee } = {
  0: { 
    lastname: 'Иванов', 
    firstname: 'Иван',
    patronymic: 'Иванович', 
    phone: '+7(999)999-99-99',
    profession: 'электрик',
    type: ServiceType.Electricity, 
    schedule: '', 
    experience: '',
    employement: '',
    checked: true 
  },
  1: { 
    lastname: 'Алексеев', 
    firstname: 'Алексей',
    patronymic: 'Алексеевич', 
    phone: '+7(999)999-99-99',
    profession: 'сварщик',
    type: ServiceType.Gas, 
    schedule: '', 
    experience: '',
    employement: '',
    checked: true 
  },
  2: { 
    lastname: 'Петров', 
    firstname: 'Петр',
    patronymic: 'Петрович', 
    phone: '+7(999)999-99-99',
    profession: 'сантехник',
    type: ServiceType.Water, 
    schedule: '', 
    experience: '',
    employement: '',
    checked: true 
  },
  3: { 
    lastname: 'Николаев', 
    firstname: 'Николай',
    patronymic: 'Николаевич', 
    phone: '+7(999)999-99-99',
    profession: 'сварщик',
    type: ServiceType.Gas, 
    schedule: '', 
    experience: '',
    employement: '',
    checked: true 
  },
};