import { Request, Response } from "express";
import IUser from "./user.interface";

export default interface IContext {
  req: Request;
  res: Response;
  user?: IUser;
}
