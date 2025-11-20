import express from 'express';
import cors from 'cors';
import patientsRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(cors());
app.use(express.json());

// Ping route
app.get('/ping', (_req, res) => {
  res.send('pong');
});

// Routes
app.use('/patients', patientsRouter);
app.use('/diagnoses', diagnosesRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
