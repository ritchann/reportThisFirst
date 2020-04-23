export interface FilterType {
  isElectricity: boolean;
  isWater: boolean;
  isGas: boolean;
  isHeat: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}