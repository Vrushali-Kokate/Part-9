
const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100; // convert cm to meters
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

// Hard-coded example
console.log(calculateBmi(180, 74));
