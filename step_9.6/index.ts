// import express, { Request, Response } from 'express';
// import { calculator, Operation } from './calculator';

// interface CalculateRequestBody {
//   value1: number | string;
//   value2: number | string;
//   op: unknown;
// }

// const app = express();
// app.use(express.json());

// // Type guard
// function isOperation(op: unknown): op is Operation {
//   return ['add', 'multiply', 'divide'].includes(op as string);
// }

// app.post(
//   '/calculate',
//   (req: Request<unknown, unknown, CalculateRequestBody>, res: Response) => {
//     const { value1, value2, op } = req.body;

//     // Validate numbers
//     const num1 = Number(value1);
//     const num2 = Number(value2);
//     if (isNaN(num1)) {
//       return res.status(400).send({ error: 'value1 must be a number' });
//     }
//     if (isNaN(num2)) {
//       return res.status(400).send({ error: 'value2 must be a number' });
//     }

//     // Validate operation
//     if (!isOperation(op)) {
//       return res.status(400).send({ error: 'Invalid operation' });
//     }

//     try {
//       // Fully safe call
//       const result: number = calculator(num1, num2, op);
//       return res.send({ result });
//     } catch (err: unknown) {
//       // Safely handle runtime errors
//       const message = err instanceof Error ? err.message : 'Unknown error';
//       return res.status(500).send({ error: message });
//     }
//   }
// );

// app.listen(3000, () => console.log('Server running on port 3000'));
import express, { Request, Response } from 'express';
import { calculator, Operation } from './calculator';

interface CalculateRequestBody {
  value1: number | string;
  value2: number | string;
  op: unknown;
}

const app = express();
app.use(express.json());

// Type guard to narrow 'op' to Operation
function isOperation(op: unknown): op is Operation {
  return ['add', 'multiply', 'divide'].includes(op as string);
}

app.post(
  '/calculate',
  (req: Request<unknown, unknown, CalculateRequestBody>, res: Response) => {
    const { value1, value2, op } = req.body;

    // Validate numeric inputs
    const num1 = Number(value1);
    const num2 = Number(value2);

    if (isNaN(num1)) {
      return res.status(400).send({ error: 'value1 must be a number' });
    }

    if (isNaN(num2)) {
      return res.status(400).send({ error: 'value2 must be a number' });
    }

    // Validate operation
    if (!isOperation(op)) {
      return res.status(400).send({ error: 'Invalid operation' });
    }

    // Check division by zero
    if (op === 'divide' && num2 === 0) {
      return res.status(400).send({ error: 'Cannot divide by zero' });
    }

    // Safe calculator call
    const result: number = calculator(num1, num2, op);
    return res.send({ result });
  }
);

app.listen(3000, () => console.log('Server running on port 3000'));
