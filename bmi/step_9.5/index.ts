import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json());

// ------------------ BMI ENDPOINT ------------------
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

  const bmiResult = calculateBmi(h, w);

  return res.json({
    weight: w,
    height: h,
    bmi: bmiResult,
  });
});

// ------------------ START SERVER ------------------
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
