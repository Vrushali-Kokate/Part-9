import { isNotNumber } from './utils';

const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi < 25) return 'Normal range';
  if (bmi >= 25 && bmi < 30) return 'Overweight';
  return 'Obese';
};

// Parse command-line arguments
try {
  const [, , heightArg, weightArg] = process.argv;

  if (!heightArg || !weightArg) {
    throw new Error('Not enough arguments. Usage: npm run calculateBmi <heightCm> <weightKg>');
  }

  if (isNotNumber(heightArg) || isNotNumber(weightArg)) {
    throw new Error('Provided values must be numbers.');
  }

  const height = Number(heightArg);
  const weight = Number(weightArg);

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  } else {
    console.log('Unknown error occurred');
  }
}
