import { createClient } from "redis";
import config from "../config/config";

const connectionString = `redis://${config.redis.host}:${config.redis.port}`;

const redisClient = createClient({
  url: connectionString
});


export const retrieveTokenFromMemory = async (
  key: string
): Promise<string|null> => {
  const token = await redisClient.get(key.toString());
  return token;
}

export const saveTokenInMemory = async (
  key: string, value: string
): Promise<void> => {
  await redisClient.set(key.toString(), value);;
}

export const deleteTokenFromMemory = async (
  key: string
): Promise<void> => {
  await redisClient.del(key.toString());
}

export default redisClient;


