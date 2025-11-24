import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import patientService from "../services/patientService";
import { Patient, Entry } from "../types";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.getPatient(id);
        setPatient(data);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">⬅ Home</Link>

      <h2>{patient.name}</h2>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <h3>Entries</h3>
      {patient.entries.length === 0 && <p>No entries</p>}

      {patient.entries.map((entry: Entry) => (
        <div
          key={entry.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <strong>{entry.date}</strong>
          <p>{entry.description}</p>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(code => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
