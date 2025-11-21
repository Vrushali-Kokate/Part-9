import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p><i>{part.description}</i></p>
        </div>
      );

    case "group":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>project exercises: {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p><i>{part.description}</i></p>
          <p>submit to: {part.backgroundMaterial}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p><i>{part.description}</i></p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
