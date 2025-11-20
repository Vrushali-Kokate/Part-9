

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

// Run directly from CLI ✔
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("Usage: npm run calculateBmi <height> <weight>");
    process.exit(1);
  }

  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    console.log("Error: malformatted parameters");
    process.exit(1);
  }

  console.log(calculateBmi(height, weight));
}
