import { Request } from "express";

export interface IUser {
  id?: string;
  email: string;
  password: string;
  verified?: boolean;
}

export interface IUserRequest extends Request {
  user?: IUser;
} 

export interface IToken {
  id?: string;
}