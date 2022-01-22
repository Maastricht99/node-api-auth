import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { generateAccessToken, 
  validateAccessToken, 
  generateRefreshToken, 
  validateRefreshToken } from "../helpers/JWT.validation";
import { comparePassword, hashPassword } from "../helpers/password.hashing";
import { IUserRequest, IToken, IUser } from "../interfaces/interfaces";
import { createNewUser, getUserByEmail, setUserVerified } from "../models/auth.model";
import { sendVerificationEmail } from "../services/email.service";
import { retrieveTokenFromMemory, saveTokenInMemory } from "../redis/redis.client";

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
    // Save refresh token in redis client with id as key
    await saveTokenInMemory(newUser.id!, refreshToken);
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
    // Save refresh token in redis client with id as key
    await saveTokenInMemory(user.id!, refreshToken);
    // Remove password and return
    user.password = "";
    return res.status(200).json({
      message: "User succesfully logged in.",
      user,
      accessToken,
      refreshToken
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export const refresh = async (req: Request, res: Response): Promise<Response> => {
  const { refreshToken } = req.body;
  try {
    // Validate refresh token and get id from payload
    const { id }: JwtPayload = validateRefreshToken(refreshToken) as IToken;
    // If no id, return error
    if (!id) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    // Search for refresh token in memory
    const tokenInMemory = await retrieveTokenFromMemory(id);
    // If no token, return error
    if (!tokenInMemory) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    // Generate and return new accessToken and refreshToken
    const accessToken = generateAccessToken(id);
    const newRefreshToken = generateRefreshToken(id);
    // Save refresh token in redis client with id as key
    await saveTokenInMemory(id, newRefreshToken);
    // Return response
    return res.status(200).json({
      accessToken, 
      refreshToken: newRefreshToken
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

// Needs authentication
export const verifyEmail = async (req: IUserRequest, res: Response): Promise<Response> => {
  const { id, email } = req.user!;
  try {
    // Create token to verify email
    const token = generateAccessToken(id!);
    // Send email with token
    await sendVerificationEmail(email, token);
    // Return response
    return res.status(201).json({ message: "Email succesfully sent." });
  } catch(err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export const verifyEmailToken = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.params;
  try {
    // Get id from token
    const { id }: JwtPayload = validateAccessToken(token) as IToken;
    // If no id token not valid, return error
    if (!id) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    // If id token valid, update user in db
    await setUserVerified(id);
    // return response
    return res.status(200).json({ message: "Email succesfully verified."});
  } catch(err: any) {
    return res.status(500).json({ error: err.message });
  }
}