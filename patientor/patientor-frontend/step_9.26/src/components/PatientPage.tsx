import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import patientService from "../services/patientService";
import { Patient, Entry } from "../types";
import { useStateValue } from "../state";

import EntryDetails from "./EntryDetails";
import { Male, Female } from "@mui/icons-material";

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

  const genderIcon = patient.gender === "male" ? <Male /> : <Female />;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">⬅ Back</Link>
      <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {patient.name} {genderIcon}
      </h2>

      <h3>Entries</h3>
      {patient.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}

      <button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        ADD NEW ENTRY
      </button>
    </div>
  );
};

export default PatientPage;
