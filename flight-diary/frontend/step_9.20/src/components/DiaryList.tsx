import { DiaryEntry } from "../types";

interface Props {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: Props) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map((d) => (
        <div key={d.id} style={{ marginBottom: "1rem" }}>
          <strong>{d.date}</strong>
          <p>Weather: {d.weather}</p>
          <p>Visibility: {d.visibility}</p>
          <em>{d.comment}</em>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
