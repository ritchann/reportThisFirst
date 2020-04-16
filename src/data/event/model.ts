export interface EventType {
  description: string;
  type: string;
  lon: number;
  lat: number;
  priority: string;
  status: string;
  id: number;
  created_at: string;
  deadline: string;
  start_time: string;
  user: any;
}

export interface EventChanged {
  id: number;
  description: string;
  lon: number;
  lat: number;
  is_system: boolean;
  rejected_reason: string;
}

export interface FilterType {
  isElectricity: boolean;
  isWater: boolean;
  isGas: boolean;
  isHeat: boolean;
  date?: Date;
  status?: string;
  level?: string;
}
