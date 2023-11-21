import { NextFunction, Request, Response } from 'express'
import verifyRoleExist from '@rolesAPI/middlewares/verifyRoleExist'

export default async function GetRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params

  await verifyRoleExist(Number(id), response)

  next()
}
