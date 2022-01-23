import express, { Application } from "express";
import cors from "cors";

import authRouter from "./routes/auth.route";
import testRouter from "./routes/test.route";
import db from "./db/db";
import redisClient from "./redis/redis.client";
import config from "./config/config";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(authRouter);
app.use(testRouter);

const runApplication = async () => {
  await db.connect()
  .then(() => console.log(`Postgres database connected on ${config.database.host}:${config.database.port}.`))
  .catch((err: any) => console.log("Postgres database error:", err));

  await redisClient.connect()
  .then(() => console.log(`Redis database connected on ${config.redis.host}:${config.redis.port}.`))
  .catch((err: any) => console.log("Redis database error:", err));

  app.listen(config.server.port, () => console.log(`Server running on ${config.server.host}:${config.server.port}.`));
}

runApplication();




