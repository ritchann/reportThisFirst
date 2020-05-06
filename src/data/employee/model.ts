export interface Employee {
  firstname: string,
  lastname: string,
  patronymic: string,
  phone: string,
  type: string,
  profession: string,
  experience: string,
  schedule: string,
  employement: string,
  checked: boolean
};

export interface FilterType {
  isElectricity: boolean;
  isWater: boolean;
  isGas: boolean;
  isHeat: boolean;
  experience?: string;
  schedule?: string;
  employement?: string;
}