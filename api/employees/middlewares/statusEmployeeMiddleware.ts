import { NextFunction, Request, Response } from 'express'
import VerifyIdAndEmployeeExist from './verifyIdAndEmployeeExist'

export default async function StatusEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewareStatusEmployee(request, response, next)
}

const verifyMiddlewareStatusEmployee = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { id } = request.params

  await VerifyIdAndEmployeeExist(Number(id))

  next()
}
