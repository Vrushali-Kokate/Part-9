import axios from "axios";
import { Patient, Entry } from "../types";

const baseUrl = "http://localhost:3001/api/patients";

export const getPatient = async (id: string): Promise<Patient> => {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data;
};

export const addEntry = async (patientId: string, entry: Omit<Entry, "id">): Promise<Entry> => {
  const { data } = await axios.post(`${baseUrl}/${patientId}/entries`, entry);
  return data;
};

export default { getPatient, addEntry };
