import express from 'express';
import cors from 'cors';

import pingRouter from './routes/ping';
import patientsRouter from './routes/patients';

const app = express();

app.use(cors());
app.use(express.json());

// frontend expects /ping and /patients
app.use('/ping', pingRouter);
app.use('/patients', patientsRouter);

const PORT = 3000; // must match frontend apiBaseUrl

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
