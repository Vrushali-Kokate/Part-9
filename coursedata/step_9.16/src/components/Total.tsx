import { CoursePart } from "../types";

const Total = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((sum, p) => sum + p.exerciseCount, 0)}
    </p>
  );
};

export default Total;
