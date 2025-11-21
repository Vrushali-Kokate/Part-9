import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import * as diaryService from "./services/diaryService";

import DiaryList from "./components/DiaryList";
import AddDiaryForm from "./components/AddDiaryForm";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService
      .getAll()
      .then(data => setDiaries(data))
      .catch(e => console.error(e));
  }, []);

  const addDiary = (entry: NewDiaryEntry) => {
    diaryService
      .createDiary(entry)
      .then(added => setDiaries(diaries.concat(added)))
      .catch(e => alert(e.response?.data || "Error adding diary"));
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <AddDiaryForm addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;
