import Welcome from './components/Welcome';

const App = () => {
  // Good usage: name is a string
  return (
    <div style={{ padding: 20 }}>
      <h2>React + TypeScript demo</h2>
      <Welcome name="Vrushali" />
      <hr />
      <p>
        Try changing <code>name</code> to a number in <code>App.tsx</code> to see the TypeScript error in your editor.
      </p>
    </div>
  );
};

export default App;
