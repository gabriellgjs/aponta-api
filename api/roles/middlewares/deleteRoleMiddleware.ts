import { NextFunction, Request, Response } from 'express'
import verifyRoleExistById from '@rolesAPI/middlewares/verifyRoleExistById'

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

  await verifyRoleExistById(request, id, response)

  next()
}
