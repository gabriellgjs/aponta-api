import { NextFunction, Request, Response } from 'express'
import verifyRoleExist from '@rolesAPI/middlewares/verifyRoleExist'

export default async function DeleteRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewareDeleteRole(request, response, next)
}

const verifyMiddlewareDeleteRole = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { id } = request.params

  await verifyRoleExist(Number(id), response)

  next()
}
