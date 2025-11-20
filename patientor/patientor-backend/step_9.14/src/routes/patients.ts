import express from "express";
import patientsService from "../services/patientsService";
import { z } from "zod";
import { Gender, Patient, NonSensitivePatient } from "../types";

const router = express.Router();

// Zod schema for validating new patient
const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  occupation: z.string()
});

// GET all patients (without ssn)
router.get("/", (_req, res) => {
  const patients: NonSensitivePatient[] = patientsService.getPatients();
  res.json(patients);
});

// POST new patient
router.post("/", (req, res) => {
  try {
    const parsedPatient = newPatientSchema.parse(req.body); // Zod validation
    const newPatient: Patient = patientsService.addPatient(parsedPatient);
    res.status(201).json(newPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
