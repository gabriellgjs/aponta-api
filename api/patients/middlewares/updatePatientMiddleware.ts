import { NextFunction, Request, Response } from 'express'
import { fromZodError } from 'zod-validation-error'
import { personValidatorZod } from '@sharedAPI/middlewares/personValidatorZod'
import { verifyCPFExist } from '@sharedAPI/middlewares/verifyCPFExist'
import { verifyPatientExist } from '@sharedAPI/middlewares/verifyPatientExist'

export default async function UpdatePatientMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const id = Number(request.params.id)

  const patientExist = await verifyPatientExist(id)

  if (!patientExist) {
    return response
      .status(404)
      .json({ status: 404, message: 'Paciente não encontrado' })
  }

  const personSchemaVerification = await personValidatorZod(request)

  if (!personSchemaVerification.success) {
    return response.status(400).json({
      status: 400,
      message:
        fromZodError(personSchemaVerification.error).details[0].message ?? '',
    })
  }

  const { cpf } = request.body

  const cpfExist = await verifyCPFExist(cpf)
  const isSameCPF = cpfExist?.id == id
  if (cpfExist && isSameCPF) {
    return response
      .status(400)
      .json({ status: 400, message: 'CPF já cadastrado' })
  }

  next()
}
