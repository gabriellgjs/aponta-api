import { NextFunction, Request, Response } from 'express'
import { verifyEmployeeExist } from '@sharedAPI/middlewares/verifyEmployeeExist'

export default async function StatusEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const id = request.params.id

  const employeeExist = await verifyEmployeeExist(id)

  if (!employeeExist) {
    return response
      .status(404)
      .json({ status: 404, message: 'Funcionário não encontrado' })
  }
  next()
}
