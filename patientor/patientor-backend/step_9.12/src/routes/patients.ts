import express from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatient, Patient } from '../types';

const router = express.Router();

// GET all non-sensitive patients
router.get('/', (_req, res) => {
  const patients: NonSensitivePatient[] = patientsService.getNonSensitivePatients();
  res.json(patients);
});

// POST a new patient
router.post('/', (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    if (!name || !gender || !occupation) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPatient = patientsService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    });

    res.json(newPatient);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
