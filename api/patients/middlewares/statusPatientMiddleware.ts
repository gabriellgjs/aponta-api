import { NextFunction, Request, Response } from 'express'
import { verifyPatientExist } from '@sharedAPI/middlewares/verifyPatientExist'

export default async function StatusPatientMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const id = request.params.id

  const patientExist = await verifyPatientExist(id)

  if (!patientExist) {
    return response
      .status(404)
      .json({ status: 404, message: 'Paciente não encontrado' })
  }
  next()
}
