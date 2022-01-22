import express, { Application } from "express";
import cors from "cors";

import authRouter from "./routes/auth.route";
import testRouter from "./routes/test.route";
import db from "./db/db";
import config from "./config/config";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(authRouter);
app.use(testRouter);

// Db connection and server start
db.connect()
  .then(() => {
    console.log(`Database connected on ${config.database.host}:${config.database.port}.`);
    app.listen(config.server.port, () => {
      console.log(`Server running on ${config.server.host}:${config.server.port}.`);
    });
  }).catch((err: any) => {
    console.log(`Database error:`, err);
  });

