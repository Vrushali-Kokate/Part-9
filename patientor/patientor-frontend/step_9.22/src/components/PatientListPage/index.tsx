import { useEffect, useState } from "react";
import { getAllPatients } from "../../services/patientService";
import { PatientListItem } from "../../types";
import { Link } from "react-router-dom";

const PatientListPage = () => {
  const [patients, setPatients] = useState<PatientListItem[]>([]);

  useEffect(() => {
    getAllPatients().then(data => setPatients(data));
  }, []);

  return (
    <div>
      <h1>Patientor</h1>
      {patients.map(p => (
        <p key={p.id}>
          <Link to={`/patients/${p.id}`}>{p.name}</Link>
        </p>
      ))}
    </div>
  );
};

export default PatientListPage;
