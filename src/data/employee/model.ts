export interface Employee {
  id: number;
  firstname: string,
  lastname: string,
  patronymic: string,
  phone: string,
  type?: string,
  profession: string,
  experience?: string,
  schedule?: string,
  employement?: string
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