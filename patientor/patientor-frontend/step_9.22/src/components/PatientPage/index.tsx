import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPatient } from "../../services/patientService";
import { Patient, Gender } from "../../types";

import GenderIcon from "../GenderIcon";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id) {
      getPatient(id).then(data => setPatient(data));
    }
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">
        <button>HOME</button>
      </Link>

      <h2>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h2>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
