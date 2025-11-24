import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import { useEffect } from "react";
import { useStateValue } from "./state";
import diagnosisService from "./services/diagnosisService";

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      dispatch({ type: "SET_DIAGNOSES", payload: diagnoses });
    };
    fetchDiagnoses();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientListPage />} />
        <Route path="/patients/:id" element={<PatientPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
