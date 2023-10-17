import { NextFunction, Request, Response } from 'express'
import VerifyIdAndEmployeeExist from './verifyIdAndEmployeeExist'

export default async function DeleteEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewareDeleteEmployee(request, response, next)
}

const verifyMiddlewareDeleteEmployee = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { id } = request.params

  await VerifyIdAndEmployeeExist(Number(id))

  next()
}
