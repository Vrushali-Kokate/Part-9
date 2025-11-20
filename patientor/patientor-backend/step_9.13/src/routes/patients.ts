import express from "express";
import patientsService from "../services/patientsService";
import { Patient, Gender } from "../types";

const router = express.Router();

// GET /patients
router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

// POST /patients
router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  if (!name || !dateOfBirth || !gender || !occupation) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  if (!patientsService.isGender(gender)) {
    return res.status(400).send({ error: "Invalid gender" });
  }

  const newPatient: Omit<Patient, "id"> = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };

  const addedPatient = patientsService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;
