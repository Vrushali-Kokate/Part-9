
interface WelcomeProps {
  name: string;
  subtitle?: string;
}

// Functional React component typed via props interface
const Welcome = ({ name, subtitle }: WelcomeProps) => {
  return (
    <div>
      <h1>Hello, {name}</h1>
      {subtitle ? <h3>{subtitle}</h3> : null}
    </div>
  );
};

export default Welcome;
