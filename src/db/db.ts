import { Pool } from "pg";
import config from "../config/config";

const db = new Pool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  database: config.database.name,
  password: config.database.password
});

export default db;