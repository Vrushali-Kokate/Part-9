import axios from "axios";
import { Patient, PatientListItem } from "../types";

const apiBaseUrl = "http://localhost:3001/api";

export const getAllPatients = async () => {
  const { data } = await axios.get<PatientListItem[]>(`${apiBaseUrl}/patients`);
  return data;
};

export const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};
