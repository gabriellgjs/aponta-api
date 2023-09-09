import { NextFunction, Request, Response } from "express";
import verifyExistUser from "./VerifyExistUser";

export default async function LoginMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyLoginMiddleware(request, response, next);
}

const verifyLoginMiddleware = async (request: Request, response: Response, next:  NextFunction) => {
 await verifyExistUser(request)

 console.log('Login Middleware')
 next();
}