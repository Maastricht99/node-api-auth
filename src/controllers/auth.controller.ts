import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken, validateRefreshToken } from "../helpers/JWT.validation";
import { comparePassword, hashPassword } from "../helpers/password.hashing";
import { IToken, IUser } from "../interfaces/interfaces";
import { createNewUser, getUserByEmail } from "../models/user.model";

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  try {
    // Check if email is already in use
    const user = await getUserByEmail(email);
    // If user, return error
    if (user) {
      return res.status(401).json({ error: "User already registered." });
    }
    // If no user, hash password and create new one
    const hashedPassword = await hashPassword(password);
    const newUser: IUser = await createNewUser(email, hashedPassword);
    // Generate access and refresh token
    const accessToken = generateAccessToken(newUser.id!);
    const refreshToken = generateRefreshToken(newUser.id!);
    // Remove password from user and return
    newUser.password = "";
    return res.status(201).json({
      message: "User successfully registered.",
      user: newUser,
      accessToken,
      refreshToken
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await getUserByEmail(email);
    // If no user, return error
    if (!user) {
      return res.status(401).json({ error: "Wrong credentials." });
    }
    // If user, compare password with hashed one
    const isPasswordValid = await comparePassword(password, user.password);
    // If not valid, return error
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong credentials." });
    }
    // If credentials valid, generate tokens
    const accessToken = generateAccessToken(user.id!);
    const refreshToken = generateRefreshToken(user.id!);
    // Remove password and return
    user.password = "";
    return res.status(200).json({
      message: "User uccesfully logged in.",
      user,
      accessToken,
      refreshToken
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

const refresh = async (req: Request, res: Response): Promise<Response> => {
  const { refreshToken } = req.body;
  try {
    // Validate refresh token and get id from payload
    const { id }: JwtPayload = validateRefreshToken(refreshToken) as IToken;
    // If no id, return error
    if (!id) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    // Generate and return new accessToken and refreshToken
    const accessToken = generateAccessToken(id);
    const newRefreshToken = generateRefreshToken(id);
    return res.status(200).json({
      accessToken, 
      refreshToken: newRefreshToken
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}