import patients from "../../data/patients";
import { Patient, NonSensitivePatient, Gender } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const addPatient = (patient: Omit<Patient, "id">): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

// Type guards
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default {
  getPatients,
  addPatient,
  isGender
};
