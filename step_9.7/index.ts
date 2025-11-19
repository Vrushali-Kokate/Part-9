import express, { Request, Response } from 'express';
import { calculator, Operation } from './calculator';
import { calculateExercises, ExerciseResult } from './calculatorExercise';

const app = express();
app.use(express.json());

// ---- /calculate endpoint ----
function isOperation(op: unknown): op is Operation {
  return ['add', 'multiply', 'divide'].includes(op as string);
}

interface CalculateRequestBody {
  value1: number | string;
  value2: number | string;
  op: unknown;
}

app.post('/calculate', (req: Request<unknown, unknown, CalculateRequestBody>, res: Response) => {
  const { value1, value2, op } = req.body;

  const num1 = Number(value1);
  const num2 = Number(value2);

  if (isNaN(num1)) return res.status(400).json({ error: 'value1 must be a number' });
  if (isNaN(num2)) return res.status(400).json({ error: 'value2 must be a number' });
  if (!isOperation(op)) return res.status(400).json({ error: 'Invalid operation' });
  if (op === 'divide' && num2 === 0) return res.status(400).json({ error: 'Cannot divide by zero' });

  const result: number = calculator(num1, num2, op);
  return res.json({ result });
});

// ---- /exercises endpoint ----
interface ExercisesRequestBody {
  daily_exercises: Array<number | string>;
  target: number | string;
}

app.post('/exercises', (req: Request<unknown, unknown, ExercisesRequestBody>, res: Response) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const areNumbers = daily_exercises.every(d => !isNaN(Number(d)));
  if (!areNumbers) return res.status(400).json({ error: "malformatted parameters" });

  const dailyNumbers = daily_exercises.map(d => Number(d));
  const targetNumber = Number(target);

  const result: ExerciseResult = calculateExercises(dailyNumbers, targetNumber);
  return res.json(result);
});

// ---- Start server ----
app.listen(3003, () => console.log('Server running on port 3003'));
