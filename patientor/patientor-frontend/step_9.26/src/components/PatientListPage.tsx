import { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "../types";
import { Link } from "react-router-dom";

const PatientListPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data } = await axios.get("http://localhost:3001/api/patients");
      setPatients(data);
    };
    fetchPatients();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patients</h2>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>
            <Link to={`/patients/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientListPage;
