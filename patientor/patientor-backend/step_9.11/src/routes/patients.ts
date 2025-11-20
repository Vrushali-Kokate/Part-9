import express from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: NonSensitivePatient[] = patientsService.getNonSensitivePatients();
  res.json(patients);
});

export default router;
