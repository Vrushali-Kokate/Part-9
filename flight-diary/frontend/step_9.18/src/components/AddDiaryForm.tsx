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
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </div>

      <div>
        Weather:
        <input
          type="text"
          value={weather}
          onChange={(e) => setWeather(e.target.value as Weather)}
          placeholder="Sunny, Rainy, Cloudy..."
        />
      </div>

      <div>
        Visibility:
        <input
          type="text"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as Visibility)}
          placeholder="Great, Good, Poor..."
        />
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
