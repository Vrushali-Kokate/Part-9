import { Routes, Route } from "react-router-dom";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientListPage />} />
      <Route path="/patients/:id" element={<PatientPage />} />
    </Routes>
  );
};

export default App;
