import React, { useState } from "react";
import axios from "axios";
import { Patient, Entry, Diagnosis } from "../types";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormHelperText
} from "@mui/material";
import { useStateValue } from "../state";

interface Props {
  patient: Patient;
  updatePatientEntries: (entries: Entry[]) => void;
}

const AddEntryForm: React.FC<Props> = ({ patient, updatePatientEntries }) => {
  const [entryType, setEntryType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [{ diagnoses }] = useStateValue();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!description || !date || !specialist) {
      setError("Please fill all required fields.");
      return;
    }

    let newEntry: Omit<Entry, "id">;

    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating,
          diagnosisCodes: selectedDiagnosisCodes.length ? selectedDiagnosisCodes : undefined,
        };
        break;

      case "Hospital":
        if (!dischargeDate || !dischargeCriteria) {
          setError("Discharge date and criteria are required.");
          return;
        }
        newEntry = {
          type: "Hospital",
          description,
          date,
          specialist,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
          diagnosisCodes: selectedDiagnosisCodes.length ? selectedDiagnosisCodes : undefined,
        };
        break;

      case "OccupationalHealthcare":
        if (!employerName) {
          setError("Employer name is required.");
          return;
        }
        newEntry = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
          diagnosisCodes: selectedDiagnosisCodes.length ? selectedDiagnosisCodes : undefined,
        };
        break;

      default:
        return;
    }

    try {
      // POST the new entry
      const { data: addedEntry } = await axios.post(
        `http://localhost:3001/api/patients/${patient.id}/entries`,
        newEntry
      );

      // ⚡ FIX: append new entry to existing patient entries
      updatePatientEntries([...patient.entries, addedEntry]);

      setSuccessMessage("Entry added successfully!");
      setShowForm(false);

      // Reset form fields
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating(0);
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
      setSelectedDiagnosisCodes([]);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  if (!showForm) {
    return (
      <>
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)} sx={{ mt: 2 }}>
          ADD NEW ENTRY
        </Button>
        {successMessage && <p style={{ color: "green", marginTop: "8px" }}>{successMessage}</p>}
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px", border: "1px dashed #333", padding: "15px", borderRadius: "5px" }}>
      <h3>New Entry</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <FormControl fullWidth margin="normal">
        <InputLabel>Entry Type</InputLabel>
        <Select value={entryType} onChange={(e) => setEntryType(e.target.value as any)}>
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth margin="normal" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <TextField fullWidth margin="normal" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
      <TextField fullWidth margin="normal" label="Specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} required />

      {entryType === "HealthCheck" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>HealthCheck Rating</InputLabel>
          <Select value={healthCheckRating} onChange={(e) => setHealthCheckRating(Number(e.target.value))} required>
            {[0, 1, 2, 3].map((val) => <MenuItem key={val} value={val}>{val}</MenuItem>)}
          </Select>
        </FormControl>
      )}

      {entryType === "Hospital" && (
        <>
          <TextField fullWidth margin="normal" label="Discharge Date" type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
          <TextField fullWidth margin="normal" label="Discharge Criteria" value={dischargeCriteria} onChange={(e) => setDischargeCriteria(e.target.value)} required />
        </>
      )}

      {entryType === "OccupationalHealthcare" && (
        <>
          <TextField fullWidth margin="normal" label="Employer Name" value={employerName} onChange={(e) => setEmployerName(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Sick Leave Start" type="date" value={sickLeaveStart} onChange={(e) => setSickLeaveStart(e.target.value)} InputLabelProps={{ shrink: true} }/>
          <TextField fullWidth margin="normal" label="Sick Leave End" type="date" value={sickLeaveEnd} onChange={(e) => setSickLeaveEnd(e.target.value)} InputLabelProps={{ shrink: true} }/>
        </>
      )}

      <FormControl fullWidth margin="normal">
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          multiple
          value={selectedDiagnosisCodes}
          onChange={(e) => setSelectedDiagnosisCodes(e.target.value)}
          input={<OutlinedInput label="Diagnosis Codes" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {diagnoses.map((diag: Diagnosis) => (
            <MenuItem key={diag.code} value={diag.code}>
              <Checkbox checked={selectedDiagnosisCodes.indexOf(diag.code) > -1} />
              <ListItemText primary={`${diag.code} ${diag.name}`} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Optional: Select one or more diagnosis codes</FormHelperText>
      </FormControl>

      <div style={{ marginTop: "15px" }}>
        <Button variant="contained" color="secondary" onClick={() => setShowForm(false)} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">Add Entry</Button>
      </div>
    </form>
  );
};

export default AddEntryForm;
