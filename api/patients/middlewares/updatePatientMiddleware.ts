import { NextFunction, Request, Response } from 'express'
import { fromZodError } from 'zod-validation-error'
import { personValidatorZod } from '@sharedAPI/middlewares/personValidatorZod'
import { verifyCPFExist } from '@sharedAPI/middlewares/verifyCPFExist'

export default async function UpdatePatientMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
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
  const isSameCPF = cpfExist?.patient[0].id !== Number(request.params.id)
  if (cpfExist && isSameCPF) {
    return response
      .status(400)
      .json({ status: 400, message: 'CPF já cadastrado' })
  }

  next()
}
