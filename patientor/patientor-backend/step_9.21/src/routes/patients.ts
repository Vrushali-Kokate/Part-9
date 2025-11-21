import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (!patient) {
    return res.status(404).send({ error: "Patient not found" });
  }

  return res.send(patient);
});

export default router;
