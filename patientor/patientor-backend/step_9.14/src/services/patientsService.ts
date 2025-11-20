import patients from "../../data/patients";
import { Patient, NonSensitivePatient, Gender } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: Omit<Patient, "id">): Patient => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};
