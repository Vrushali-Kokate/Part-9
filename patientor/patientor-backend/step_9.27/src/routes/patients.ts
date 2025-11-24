import express from 'express';
import patientService from '../services/patientService';
import { Entry, HealthCheckRating } from '../types';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Helper to parse diagnosis codes
const parseDiagnosisCodes = (object: unknown): Array<string> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) return [];
  return (object as { diagnosisCodes: Array<string> }).diagnosisCodes;
};

// GET all non-sensitive patients
router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

// GET patient by ID
router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
});

// POST new entry to patient
router.post('/:id/entries', (req, res) => {
  const body = req.body;
  const patientId = req.params.id;

  try {
    if (!body || !body.type || !body.date || !body.specialist || !body.description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const baseEntry = {
      id: uuidv4(),
      date: body.date,
      specialist: body.specialist,
      description: body.description,
      diagnosisCodes: parseDiagnosisCodes(body),
      type: body.type
    };

    let newEntry: Entry;

    switch (body.type) {
      case "Hospital":
        if (!body.discharge?.date || !body.discharge?.criteria)
          return res.status(400).json({ error: "Missing discharge info" });
        newEntry = { ...baseEntry, type: "Hospital", discharge: body.discharge };
        break;

      case "OccupationalHealthcare":
        if (!body.employerName)
          return res.status(400).json({ error: "Missing employerName" });
        newEntry = { ...baseEntry, type: "OccupationalHealthcare", employerName: body.employerName, sickLeave: body.sickLeave };
        break;

      case "HealthCheck":
        if (body.healthCheckRating === undefined)
          return res.status(400).json({ error: "Missing healthCheckRating" });
        newEntry = { ...baseEntry, type: "HealthCheck", healthCheckRating: body.healthCheckRating };
        break;

      default:
        return res.status(400).json({ error: "Invalid entry type" });
    }

    const added = patientService.addEntry(patientId, newEntry);
    res.status(201).json(added);

  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
