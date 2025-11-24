import React, { useEffect, useState } from "react";
import { Patient } from "../types";
import patientService from "../services/patientService";
import { Link } from "react-router-dom";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const PatientListPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await patientService.getAllPatients();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Patients</Typography>
      <List>
        {patients.map((p) => (
          <ListItem key={p.id} button component={Link} to={`/patients/${p.id}`}>
            <ListItemText primary={p.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PatientListPage;
