import { parseNumbers } from './utils';

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hour => hour > 0).length;
  const totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
  const average = totalHours / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent, you met your target!';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'needs improvement';
  }

  const success = average >= target;

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

// Parse command-line arguments
try {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error('Not enough arguments. Usage: npm run calculateExercises <target> <dailyHours...>');
  }

  const [targetArg, ...dailyHoursArgs] = args;
  const target = Number(targetArg);

  if (isNaN(target)) {
    throw new Error('Target value must be a number.');
  }

  const dailyHours = parseNumbers(dailyHoursArgs);

  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  } else {
    console.log('Unknown error occurred');
  }
}
