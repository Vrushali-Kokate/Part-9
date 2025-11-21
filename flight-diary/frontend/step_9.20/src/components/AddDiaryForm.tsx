import { useState } from "react";
import { NewDiaryEntry, Weather, Visibility } from "../types";

interface Props {
  addDiary: (entry: NewDiaryEntry) => void;
}

const AddDiaryForm = ({ addDiary }: Props) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDiary({ date, weather, visibility, comment });
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Diary</h2>

      <div>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        Weather:
        {Object.values(Weather).map((w) => (
          <label key={w}>
            <input
              type="radio"
              value={w}
              checked={weather === w}
              onChange={() => setWeather(w)}
            />
            {w}
          </label>
        ))}
      </div>

      <div>
        Visibility:
        {Object.values(Visibility).map((v) => (
          <label key={v}>
            <input
              type="radio"
              value={v}
              checked={visibility === v}
              onChange={() => setVisibility(v)}
            />
            {v}
          </label>
        ))}
      </div>

      <div>
        Comment:
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default AddDiaryForm;
