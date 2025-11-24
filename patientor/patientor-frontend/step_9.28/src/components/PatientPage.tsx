import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import patientService from "../services/patientService";
import { Patient, Entry } from "../types";
import { useStateValue } from "../state";
import EntryDetails from "./EntryDetails";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import { Male, Female } from "@mui/icons-material";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [{ diagnoses }] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const data = await patientService.getPatient(id);
          setPatient(data);
        } catch (error) {
          console.error("Failed to fetch patient:", error);
        }
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  const updatePatientEntries = (entries: Entry[]) => {
    setPatient({ ...patient, entries });
  };

  const genderIcon = patient.gender === "male" ? <Male /> : <Female />;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">⬅ Back</Link>
      <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {patient.name} {genderIcon}
      </h2>
      <p>ssn {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <AddHealthCheckEntryForm
        patient={patient}
        updatePatientEntries={updatePatientEntries}
      />

      <h3>entries</h3>
      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))
      ) : (
        <p>No entries found for this patient.</p>
      )}
    </div>
  );
};

export default PatientPage;
