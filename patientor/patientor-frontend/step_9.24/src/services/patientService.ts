import axios from "axios";
import { Patient } from "../types";

const baseUrl = "http://localhost:3001/api/patients";

export const getPatient = async (id: string): Promise<Patient> => {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data;
};

export default {
  getPatient
};
