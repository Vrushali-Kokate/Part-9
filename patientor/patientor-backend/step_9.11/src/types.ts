// Gender type (string for 9.11)
export type Gender = 'male' | 'female' | 'other';

// Patient type
export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries?: any[];
}

// Non-sensitive patient type (exclude ssn)
export type NonSensitivePatient = Omit<Patient, 'ssn'>;

// Diagnosis type
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
