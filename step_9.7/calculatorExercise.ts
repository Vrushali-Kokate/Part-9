export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (daily_exercises: number[], target: number): ExerciseResult => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter(d => d > 0).length;
  const average = daily_exercises.reduce((sum, d) => sum + d, 0) / periodLength;
  const success = average >= target;

  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};
