import { Gender } from "../types";

const GenderIcon = ({ gender }: { gender: Gender }) => {
  if (gender === Gender.Female) return <>♀</>;
  if (gender === Gender.Male) return <>♂</>;
  return <>⚧</>;
};

export default GenderIcon;
