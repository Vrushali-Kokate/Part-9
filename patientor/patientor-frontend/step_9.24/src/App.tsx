import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

function App() {
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
