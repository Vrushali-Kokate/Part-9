export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender | string; // initially string, later refactor
  occupation: string;
}

// Type for public patient data (exclude ssn)
export type NonSensitivePatient = Omit<Patient, "ssn">;
