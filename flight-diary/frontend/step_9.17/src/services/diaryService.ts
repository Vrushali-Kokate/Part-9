import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createDiary = async (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post(baseUrl, newDiary);
  return response.data;
};
