import { createClient } from "redis";
import util from "util";

const redisClient = createClient();

// Redis client by default only supports callbacks
const retrieveFromMemory = util.promisify(redisClient.get).bind(redisClient);
const saveInMemory = util.promisify(redisClient.set).bind(redisClient);
const deleteFromMemory = util.promisify(redisClient.del).bind(redisClient);

export const retrieveTokenFromMemory = async (
  key: string
): Promise<string|null> => {
  const token = await retrieveFromMemory(key);
  return token;
}

export const saveTokenInMemory = async (
  key: string, value: string
): Promise<void> => {
  await saveInMemory(key, value);;
}

export const deleteTokenFromMemory = async (
  key: string
): Promise<void> => {
  await deleteFromMemory(key);
}



