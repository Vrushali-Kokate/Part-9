// src/services/patientService.ts
import patientsData from '../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const patients: Patient[] = patientsData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export default {
  getNonSensitivePatients,
  getPatientById
};
