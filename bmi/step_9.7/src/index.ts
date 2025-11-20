import express from 'express';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Exercise Calculator API is running!');
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: any = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const allNumbers = daily_exercises.every((d) => !isNaN(Number(d)));
  if (!allNumbers) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises.map(Number), Number(target));
  return res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});