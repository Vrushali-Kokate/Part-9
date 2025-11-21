import { useState } from "react";
import { NewDiaryEntry, Weather, Visibility } from "../types";
import axios from "axios";

interface Props {
  addDiary: (entry: NewDiaryEntry) => Promise<void>;
}

const AddDiaryForm = ({ addDiary }: Props) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // disappear after 3 seconds
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: NewDiaryEntry = { date, weather, visibility, comment };

    try {
      await addDiary(newEntry); // assume this posts to backend
      setDate("");
      setComment("");
      showToast("Diary entry added successfully!", "success");
    } catch (error: unknown) {
      // Narrow down Axios error
      if (axios.isAxiosError(error) && error.response) {
        showToast(`Failed to add entry: ${error.response.data.error}`);
      } else {
        showToast("Failed to add entry: Unknown error");
      }
    }
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
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>

      <button type="submit">Add</button>

      {/* Toast notification */}
      {toast && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: toast.type === "error" ? "#ffcccc" : "#ccffcc",
            color: toast.type === "error" ? "#900" : "#060",
          }}
        >
          {toast.message}
        </div>
      )}
    </form>
  );
};

export default AddDiaryForm;
