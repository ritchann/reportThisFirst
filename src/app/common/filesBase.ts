import { ServiceType } from "data/enum";
import { FileType } from "data/files/model";

export const files: FileType[] = [
  { title: "Плановые отключения воды", date: new Date(2020, 0, 5), type: ServiceType.Water },
  { title: 'Плановые отключения электричества', date: new Date(2020, 1, 5), type: ServiceType.Electricity },
  { title: 'Плановые отключения газа', date: new Date(2020, 2, 5), type: ServiceType.Gas },
  { title: 'Плановые отключения электричества', date: new Date(2020, 3, 5), type: ServiceType.Electricity },
  { title: 'Плановые отключения воды', date: new Date(2020, 4, 5), type: ServiceType.Water },
  { title: 'Плановые отключения газа', date: new Date(2020, 5, 5), type: ServiceType.Gas }
];