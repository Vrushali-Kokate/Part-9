import express from "express";
const app = express();

app.use(express.json()); // <-- IMPORTANT: enables JSON body parsing

// BMI example
app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const h = Number(height);
  const w = Number(weight);

  if (isNaN(h) || isNaN(w)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const heightInMeters = h / 100;
  const bmi = w / (heightInMeters * heightInMeters);

  return res.json({
    height: h,
    weight: w,
    bmi: bmi,
  });
});

// EXERCISES ROUTE
app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const exerciseNumbers = daily_exercises.map((d: number) => Number(d));

  if (exerciseNumbers.some(isNaN)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const periodLength = exerciseNumbers.length;
  const trainingDays = exerciseNumbers.filter((e) => e > 0).length;
  const average =
    exerciseNumbers.reduce((a, b) => a + b, 0) / periodLength;

  const success = average >= target;

  let rating = 1;
  let ratingDescription = "bad";

  if (average >= target) {
    rating = 3;
    ratingDescription = "excellent";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return res.json({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
