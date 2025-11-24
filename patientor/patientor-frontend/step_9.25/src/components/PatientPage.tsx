import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import patientService from "../services/patientService";
import { Patient, Entry } from "../types";
import { useStateValue } from "../state";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [{ diagnoses }] = useStateValue();

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

  const getDescription = (code: string) => {
    const diag = diagnoses.find((d) => d.code === code);
    return diag ? diag.name : "Unknown diagnosis";
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">⬅ Back</Link>
      <h2>{patient.name}</h2>

      <h3>Entries</h3>
      {patient.entries.map((entry: Entry) => (
        <div
          key={entry.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "12px",
          }}
        >
          <strong>{entry.date}</strong>
          <p>{entry.description}</p>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} — {getDescription(code)}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
