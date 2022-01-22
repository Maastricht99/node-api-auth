require("dotenv").config();

const SERVER_HOST = process.env.SERVER_HOST!;
const SERVER_PORT = +process.env.SERVER_PORT!;

const server = {
  host: SERVER_HOST,
  port: SERVER_PORT
}

const DATABASE_HOST = process.env.DATABASE_HOST!;
const DATABASE_PORT = +process.env.DATABASE_PORT!;
const DATABASE_USER = process.env.DATABASE_USER!;
const DATABASE_NAME = process.env.DATABASE_NAME!;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD!;

const database = {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  name: DATABASE_NAME,
  password: DATABASE_PASSWORD
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY!;

const accessToken = {
  secret: ACCESS_TOKEN_SECRET,
  expiry: ACCESS_TOKEN_EXPIRY
}

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY!;

const refreshToken = {
  secret: REFRESH_TOKEN_SECRET,
  expiry: REFRESH_TOKEN_EXPIRY
}

const EMAIL_SERVICE = process.env.EMAIL_SERVICE!;
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;

const email = {
  service: EMAIL_SERVICE,
  user: EMAIL_USER,
  password: EMAIL_PASSWORD
}

const config = {
  server,
  database,
  accessToken,
  refreshToken,
  email
}

export default config;