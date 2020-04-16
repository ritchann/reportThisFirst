export enum Status {
  Pending = 'pending',
  Postponed = 'postponed',
  In_progress = 'in_progress',
  Investigation = 'investigation',
  Resolved = 'resolved'
}

export enum ServiceType {
  Gas = 'gas',
  Water = 'water',
  Electricity = 'electricity',
  Heat = 'heat'
}

export enum Priority {
  Very_low = 'very_low',
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Critical = 'critical'
}

export enum Visibility {
  All = 'all',
  Pending = 'pending',
  Actual = 'actual'
}
