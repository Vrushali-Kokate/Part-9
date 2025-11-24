import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Patient, Entry } from "../types";
import patientService from "../services/patientService";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { Male, Female } from "@mui/icons-material";
import { Typography, Box, Divider, Stack, Button } from "@mui/material";

const PatientPage: React.FC = () => {
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

  if (!patient) return <Typography>Loading patient data...</Typography>;

  const updatePatientEntries = (entries: Entry[]) => {
    setPatient({ ...patient, entries });
  };

  const genderIcon = patient.gender === "male" ? <Male /> : <Female />;

  return (
    <Box sx={{ p: 4 }}>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 3 }}>
        ⬅ Back
      </Button>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4">{patient.name}</Typography>
        {genderIcon}
      </Stack>

      {patient.dateOfBirth && <Typography>Birth Date: {patient.dateOfBirth}</Typography>}
      {patient.ssn && <Typography>SSN: {patient.ssn}</Typography>}
      {patient.occupation && <Typography>Occupation: {patient.occupation}</Typography>}

      <Divider sx={{ my: 3 }} />

      <AddEntryForm patient={patient} updatePatientEntries={updatePatientEntries} />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>
        Entries
      </Typography>

      {patient.entries && patient.entries.length > 0 ? (
        <Stack spacing={2}>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </Stack>
      ) : (
        <Typography>No entries found for this patient.</Typography>
      )}
    </Box>
  );
};

export default PatientPage;
