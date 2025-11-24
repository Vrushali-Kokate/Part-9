import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Patient, Entry } from "../types";
import patientService from "../services/patientService";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddHealthCheckEntryForm";
import { Male, Female } from "@mui/icons-material";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const data = await patientService.getPatient(id);
        setPatient(data);
      } catch (err) {
        console.error("Failed to fetch patient:", err);
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
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <AddEntryForm patient={patient} updatePatientEntries={updatePatientEntries} />

      <h3>Entries</h3>
      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry: Entry) => <EntryDetails key={entry.id} entry={entry} />)
      ) : (
        <p>No entries found for this patient.</p>
      )}
    </div>
  );
};

export default PatientPage;
