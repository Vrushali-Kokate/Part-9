import React, { useState } from "react";
import axios from "axios";
import { Patient, Entry } from "../types";

interface Props {
  patient: Patient;
  updatePatientEntries: (entries: Entry[]) => void;
}

const AddHealthCheckEntryForm: React.FC<Props> = ({ patient, updatePatientEntries }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number | "">("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [backendError, setBackendError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError(null);
    setSuccessMessage(null);

    // Basic front-end validation
    if (!description || !date || !specialist) {
      setBackendError("Please fill all required fields.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setBackendError("Date must be in YYYY-MM-DD format.");
      return;
    }

    if (typeof healthCheckRating !== "number" || healthCheckRating < 0 || healthCheckRating > 3) {
      setBackendError("HealthCheck rating must be between 0 and 3.");
      return;
    }

    try {
      const newEntry = {
        description,
        date,
        specialist,
        type: "HealthCheck",
        healthCheckRating,
        diagnosisCodes: diagnosisCodes
          ? diagnosisCodes.split(",").map((c) => c.trim())
          : undefined,
      };

      const { data } = await axios.post(
        `http://localhost:3001/api/patients/${patient.id}/entries`,
        newEntry
      );

      updatePatientEntries(data.entries);

      // Reset form
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating("");
      setDiagnosisCodes("");
      setShowForm(false);
      setSuccessMessage("Entry added successfully!");
    } catch (err: any) {
      setBackendError(err.response?.data?.error || "Something went wrong.");
    }
  };

  if (!showForm) {
    return (
      <>
        <button
          onClick={() => setShowForm(true)}
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
        {successMessage && <p style={{ color: "green", marginTop: "8px" }}>{successMessage}</p>}
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px dashed #333",
        padding: "15px",
        marginTop: "20px",
        borderRadius: "5px",
      }}
    >
      <h3>New HealthCheck entry</h3>

      {backendError && <p style={{ color: "red" }}>{backendError}</p>}

      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", marginBottom: "8px" }}
          required
        />
      </div>

      <div>
        <label>Date (YYYY-MM-DD)</label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
          style={{ width: "100%", marginBottom: "8px" }}
          required
        />
      </div>

      <div>
        <label>Specialist</label>
        <input
          type="text"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          style={{ width: "100%", marginBottom: "8px" }}
          required
        />
      </div>

      <div>
        <label>HealthCheck rating (0-3)</label>
        <input
          type="number"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          min={0}
          max={3}
          style={{ width: "100%", marginBottom: "8px" }}
          required
        />
      </div>

      <div>
        <label>Diagnosis codes (comma separated)</label>
        <input
          type="text"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
          style={{ width: "100%", marginBottom: "8px" }}
        />
      </div>

      <button
        type="button"
        onClick={() => setShowForm(false)}
        style={{
          backgroundColor: "crimson",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        CANCEL
      </button>

      <button
        type="submit"
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ADD
      </button>
    </form>
  );
};

export default AddHealthCheckEntryForm;
