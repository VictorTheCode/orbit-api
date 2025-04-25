import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Subsription Tracker API");
});

app.listen(PORT, () => {
  console.log(`Subdev is running on http://localhost:${PORT}`);
});
