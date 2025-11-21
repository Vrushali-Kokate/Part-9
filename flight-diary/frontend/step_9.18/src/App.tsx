import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import * as diaryService from "./services/diaryService";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("good");
  const [weather, setWeather] = useState("sunny");
  const [comment, setComment] = useState("");

  useEffect(() => {
    diaryService.getAll().then(data => setDiaries(data));
  }, []);

  const addDiary = (event: React.FormEvent) => {
    event.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    };

    diaryService
      .create(newDiary)
      .then(data => {
        setDiaries(diaries.concat(data));
        setComment("");
      })
      .catch(error => {
        alert("Error: " + error.response.data);
      });
  };

  return (
    <div>
      <h1>Flight Diary</h1>

      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div>
          visibility:
          <label><input type="radio" value="great" checked={visibility === "great"} onChange={() => setVisibility("great")} /> great</label>
          <label><input type="radio" value="good" checked={visibility === "good"} onChange={() => setVisibility("good")} /> good</label>
          <label><input type="radio" value="ok" checked={visibility === "ok"} onChange={() => setVisibility("ok")} /> ok</label>
          <label><input type="radio" value="poor" checked={visibility === "poor"} onChange={() => setVisibility("poor")} /> poor</label>
        </div>

        <div>
          weather:
          <label><input type="radio" value="sunny" checked={weather === "sunny"} onChange={() => setWeather("sunny")} /> sunny</label>
          <label><input type="radio" value="rainy" checked={weather === "rainy"} onChange={() => setWeather("rainy")} /> rainy</label>
          <label><input type="radio" value="cloudy" checked={weather === "cloudy"} onChange={() => setWeather("cloudy")} /> cloudy</label>
          <label><input type="radio" value="windy" checked={weather === "windy"} onChange={() => setWeather("windy")} /> windy</label>
        </div>

        <div>
          comment:{" "}
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map(d => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
          <i>{d.comment}</i>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
