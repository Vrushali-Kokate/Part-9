import express from "express";
import cors from "cors";
import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/patients", patientsRouter);
app.use("/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
