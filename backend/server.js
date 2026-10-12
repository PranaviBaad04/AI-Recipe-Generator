import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { init } from "confident-trace";
import recipeRoutes from "./routes/recipe.js";

const tracing = init();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/recipe", recipeRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

const shutdown = async () => {
  await new Promise((resolve) => server.close(resolve));
  await tracing.shutdown();
};

process.on("SIGINT", () => {
  void shutdown();
});
process.on("SIGTERM", () => {
  void shutdown();
});
