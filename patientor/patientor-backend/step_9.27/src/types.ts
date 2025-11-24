

// Diagnosis type (code field used in entries diagnosisCodes)
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

// BaseEntry with shared fields
export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

// Hospital entry (has discharge)
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

// OccupationalHealthcare entry (may have employerName and sickLeave)
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

// HealthCheck entry (has rating)
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

// Sum type for entries
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// Patient type — includes entries array
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender?: Gender;
  occupation?: string;
  entries: Entry[];
}

// For listing patients without sensitive fields
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
