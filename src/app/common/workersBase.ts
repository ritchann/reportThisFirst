import { ServiceType, Schedule, Experience, Employement } from "data/enum";
import { Employee } from "data/employee/model";

export const workers: Employee[] = [
  {
    id: 0,
    lastname: 'Иванов',
    firstname: 'Иван',
    patronymic: 'Иванович',
    phone: '+79069342139',
    profession: 'электрик',
    type: ServiceType.Electricity,
    schedule: Schedule.Five_days,
    experience: Experience.Low,
    employement: Employement.Half_time
  }, 
  {
    id: 1,
    lastname: 'Алексеев',
    firstname: 'Алексей',
    patronymic: 'Алексеевич',
    phone: '+79609211178',
    profession: 'сварщик',
    type: ServiceType.Gas,
    schedule: Schedule.Shift_work,
    experience: Experience.High,
    employement: Employement.Full_time
  }, 
  {
    id: 2,
    lastname: 'Петров',
    firstname: 'Петр',
    patronymic: 'Петрович',
    phone: '+79041323213',
    profession: 'сантехник',
    type: ServiceType.Water,
    schedule: Schedule.Watch,
    experience: Experience.High,
    employement: Employement.Half_time
  },
  {
    id: 3,
    lastname: 'Николаев',
    firstname: 'Николай',
    patronymic: 'Николаевич',
    phone: '+79245311243',
    profession: 'сварщик',
    type: ServiceType.Gas,
    schedule: Schedule.Shift_work,
    experience: Experience.Middle,
    employement: Employement.Part_time
  }
];