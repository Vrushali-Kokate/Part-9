import React from "react";
import { Entry } from "../types";
import { LocalHospital, Work, Favorite } from "@mui/icons-material";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  let icon;
  let color;

  switch (entry.type) {
    case "Hospital":
      icon = <LocalHospital color="error" />;
      color = "black";
      break;
    case "OccupationalHealthcare":
      icon = <Work color="primary" />;
      color = "black";
      break;
    case "HealthCheck":
      icon = <Favorite />;
      color =
        entry.healthCheckRating === 0
          ? "green"
          : entry.healthCheckRating === 1
          ? "orange"
          : "red";
      break;
    default:
      return assertNever(entry);
  }

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
      }}
    >
      <div style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
        {entry.date} {icon}{" "}
        {entry.type === "OccupationalHealthcare" ? `Employer: ${entry.employerName}` : ""}
      </div>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.type === "HealthCheck" && (
        <p style={{ color }}>
          {entry.healthCheckRating === 0 ? "💚" : entry.healthCheckRating === 1 ? "💛" : "❤️"}
        </p>
      )}
      {entry.type === "Hospital" && (
        <p>
          Discharge: {entry.discharge.date} — {entry.discharge.criteria}
        </p>
      )}
      <p>Diagnose by: {entry.specialist}</p>
    </div>
  );
};

export default EntryDetails;
