import express from "express";
import cors from "cors";

import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/patients", patientsRouter);
app.use("/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
