import { Request, Response, NextFunction } from "express";
import { 
  isValidEmail, isLongEnough, 
  isShortEnough, hasLowerLetter,
  hasUpperLetter, hasNumber, 
  hasSpecialChar } from "../helpers/input.validation";

export const validateInput = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ): Promise<Response|void> => {
    const { email, password } = req.body;
    try {
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Email format is invalid." })
      }
      if (!isLongEnough(password)) {
        return res.status(400).json({ error: "Password must be longer than 8 characters." });
      }
      if (!isShortEnough(password)) {
        return res.status(400).json({ error: "Password must be shorter than 200 characters." });
      }
      if (!hasLowerLetter(password)) {
        return res.status(400).json({ error: "Password must contain one lowercase letter." });
      }
      if (!hasUpperLetter(password)) {
        return res.status(400).json({ error: "Password must contain one uppercase letter." });
      }
      if (!hasNumber(password)) {
        return res.status(400).json({ error: "Password must contain one number." });
      }
      if (!hasSpecialChar(password)) {
        return res.status(400).json({ error: "Password must contain one special character." });
      }
      next();
    } catch(err: any) {
      return res.status(500).json({ error: err.message });
    }
  }