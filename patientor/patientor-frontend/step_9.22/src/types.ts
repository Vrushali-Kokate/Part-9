export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  entries: Entry[];
}

export type PatientListItem = Omit<Patient, "ssn" | "entries">;
