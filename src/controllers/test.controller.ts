import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/interfaces";


export const servePublic = async (
  req: Request, res: Response
): Promise<Response> => {
  try {
    return res.status(200).json({
      message: "You can read this because it's public."
    });
  } catch(err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export const servePrivate = async (
  req: IUserRequest, res: Response
): Promise<Response> => {
  const { user } = req!;
  try {
    return res.status(200).json({
      message: `You can check this content because you're authenticated as ${user!.email}`
    });
  } catch(err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export const servePrivateVerified = async (
  req: IUserRequest, res: Response
): Promise<Response> => {
  const { user } = req!;
  try {
    if (user!.verified) {
      return res.status(200).json({
        message: `You can check this content because you're authenticated as ${user!.email} and verified.`
      });
    }
    return res.status(400).json({
      message: `You can't check this content because you're authenticated as ${user!.email} but not verified.`
    });
  } catch(err: any) {
    return res.status(500).json({ error: err.message });
  }
}