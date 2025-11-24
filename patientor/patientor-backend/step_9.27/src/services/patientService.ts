import patientsData from '../data/patients';
import { Patient, NonSensitivePatient, Entry } from '../types';

const patients: Patient[] = patientsData;

const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));

const getPatientById = (id: string): Patient | undefined =>
  patients.find(p => p.id === id);

const addEntry = (patientId: string, entry: Entry): Entry => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) throw new Error("Patient not found");
  patient.entries.push(entry);
  return entry;
};

export default { getNonSensitivePatients, getPatientById, addEntry };
