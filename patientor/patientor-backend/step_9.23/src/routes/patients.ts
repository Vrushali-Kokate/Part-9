// src/routes/patients.ts
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    return res.status(404).json({ error: 'patient not found' });
  }
  // No filtering — return full patient including entries
  return res.json(patient);
});

export default router;
