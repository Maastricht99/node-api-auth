import jwt from "jsonwebtoken";
import config from "../config/config";

const generateToken = (secret: string, expiresIn: string) => {
  return (id: string) => {
    return jwt.sign({ id }, secret, { expiresIn } );
  }
}

const validateToken = (secret: string) => {
  return (token: string) => {
    return jwt.verify(token, secret);
  }
}

export const generateAccessToken = 
generateToken(config.accessToken.secret, config.accessToken.expiry);

export const validateAccessToken =
validateToken(config.accessToken.secret);

export const generateRefreshToken =
generateToken(config.refreshToken.secret, config.refreshToken.expiry);

export const validateRefreshToken =
validateToken(config.refreshToken.secret);