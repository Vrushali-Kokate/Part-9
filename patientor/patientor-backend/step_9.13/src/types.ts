// Gender enum
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

// Patient type
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

// Non-sensitive patient for GET
export type NonSensitivePatient = Omit<Patient, 'ssn'>;

// Diagnosis type
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
