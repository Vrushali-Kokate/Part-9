import express from 'express';
import patients from '../data/patients';
import { Patient } from '../types';
import { v4 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patients);
});

router.post('/', (req, res) => {
  const newPatient: Patient = {
    id: uuid(),
    ...req.body
  };

  patients.push(newPatient);
  res.json(newPatient);
});

export default router;
