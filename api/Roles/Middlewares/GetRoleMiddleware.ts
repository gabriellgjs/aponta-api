import { NextFunction, Request, Response } from "express";
import VerifyInAndRoleExist from "./VerifyIdAndRoleExist";

export default async function GetRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params;
  
  await VerifyInAndRoleExist(Number(id));

  next()
}
