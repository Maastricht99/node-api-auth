import { Response, NextFunction } from "express";
import { IUserRequest, IToken } from "../interfaces/interfaces";
import { validateAccessToken } from "../helpers/JWT.validation";
import { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../models/user.model";

export const authenticate = async (
  req: IUserRequest, 
  res: Response, 
  next: NextFunction
  ): Promise<Response|void> => {
    try {
      // Get token from headers
      const authHeaders = req.headers["authorization"];
      const token = authHeaders && authHeaders.split(" ")[1];
      // If no token, user not authorized
      if (!token) {
        return res.status(401).json({ error: "Unauthorized." });
      }
      // If token, get id from payload
      const { id }: JwtPayload = validateAccessToken(token) as IToken;
      // Get user from db 
      const user = await getUserById(id);
      // If no user, return error
      if (!user) {
        return res.status(401).json({ error: "Unauthorized." });
      }
      // If user, remove pwd and add to req body
      user.password = "";
      req.user = user;
      next();
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }