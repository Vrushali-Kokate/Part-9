import React, { useState } from "react";
import axios from "axios";
import { Patient, Entry } from "../types";

interface Props {
  patient: Patient;
  updatePatientEntries: (entries: Entry[]) => void;
}

const AddEntryForm: React.FC<Props> = ({ patient, updatePatientEntries }) => {
  const [entryType, setEntryType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number | "">("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Basic validation
    if (!description || !date || !specialist) {
      setError("Please fill all required fields.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setError("Date must be in YYYY-MM-DD format.");
      return;
    }

    let newEntry: Omit<Entry, "id">;

    switch (entryType) {
      case "HealthCheck":
        if (typeof healthCheckRating !== "number" || healthCheckRating < 0 || healthCheckRating > 3) {
          setError("HealthCheck rating must be between 0 and 3.");
          return;
        }
        newEntry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating,
          diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(",").map(c => c.trim()) : undefined,
        };
        break;

      case "Hospital":
        if (!dischargeDate || !dischargeCriteria || !/^\d{4}-\d{2}-\d{2}$/.test(dischargeDate)) {
          setError("Discharge date and criteria are required (YYYY-MM-DD).");
          return;
        }
        newEntry = {
          type: "Hospital",
          description,
          date,
          specialist,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
          diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(",").map(c => c.trim()) : undefined,
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
          diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(",").map(c => c.trim()) : undefined,
        };
        break;

      default:
        return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:3001/api/patients/${patient.id}/entries`,
        newEntry
      );

      updatePatientEntries(data.entries);
      setSuccessMessage("Entry added successfully!");
      setShowForm(false);

      // Reset form
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating("");
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
      setDiagnosisCodes("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong.");
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
      <h3>New Entry</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Entry Type</label>
        <select
          value={entryType}
          onChange={(e) => setEntryType(e.target.value as any)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="HealthCheck">HealthCheck</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">OccupationalHealthcare</option>
        </select>
      </div>

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

      {entryType === "HealthCheck" && (
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
      )}

      {entryType === "Hospital" && (
        <>
          <div>
            <label>Discharge Date (YYYY-MM-DD)</label>
            <input
              type="text"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              placeholder="YYYY-MM-DD"
              style={{ width: "100%", marginBottom: "8px" }}
              required
            />
          </div>
          <div>
            <label>Discharge Criteria</label>
            <input
              type="text"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
              style={{ width: "100%", marginBottom: "8px" }}
              required
            />
          </div>
        </>
      )}

      {entryType === "OccupationalHealthcare" && (
        <>
          <div>
            <label>Employer Name</label>
            <input
              type="text"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              style={{ width: "100%", marginBottom: "8px" }}
              required
            />
          </div>
          <div>
            <label>Sick Leave Start</label>
            <input
              type="text"
              value={sickLeaveStart}
              onChange={(e) => setSickLeaveStart(e.target.value)}
              placeholder="YYYY-MM-DD"
              style={{ width: "100%", marginBottom: "8px" }}
            />
          </div>
          <div>
            <label>Sick Leave End</label>
            <input
              type="text"
              value={sickLeaveEnd}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
              placeholder="YYYY-MM-DD"
              style={{ width: "100%", marginBottom: "8px" }}
            />
          </div>
        </>
      )}

      <div>
        <label>Diagnosis Codes (comma separated)</label>
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

export default AddEntryForm;
