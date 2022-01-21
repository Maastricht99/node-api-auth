// This model defines the way to interact with the database

import { QueryResult } from "pg";
import db from "../db/db";
import { IUser } from "../interfaces/interfaces"

export const getUserById = async (id: string): Promise<IUser> => {
  const queryStr = 
  `SELECT * FROM users WHERE id = $1;`;
  const { rows }: QueryResult<IUser> = await db.query(queryStr, [ id ]);
  const user: IUser = rows[0];
  return user; 
}

export const getUserByEmail = async (email: string): Promise<IUser> => {
  const queryStr = 
  `SELECT * FROM users WHERE email = $1;`;
  const { rows }: QueryResult<IUser> = await db.query(queryStr, [ email ]);
  const user: IUser = rows[0];
  return user; 
}

export const createNewUser = async (email: string, password: string): Promise<IUser> => {
  const queryStr = 
  `INSERT INTO users (email, password)
  VALUES ($1, $2) RETURNING *;`;
  const { rows }: QueryResult<IUser> = await db.query(queryStr, [ email, password ]);
  const user: IUser = rows[0];
  return user; 
}

