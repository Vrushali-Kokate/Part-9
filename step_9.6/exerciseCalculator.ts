// Interface for the result object
interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// Main function
const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hour => hour > 0).length;
  const totalHours = dailyHours.reduce((sum, hour) => sum + hour, 0);
  const average = totalHours / periodLength;

  let rating: number;
  let ratingDescription: string;

  // Simple rating system
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

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// Hard-coded example
const dailyHoursExample = [3, 0, 2, 4.5, 0, 3, 1];
const targetExample = 2;

console.log(calculateExercises(dailyHoursExample, targetExample));
