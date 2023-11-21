import { NextFunction, Request, Response } from 'express'
import verifyExistUser from './verifyExistUser'

export default async function LoginMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyExistUser(request, response)

  next()
}
