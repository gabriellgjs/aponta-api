import { NextFunction, Request, Response } from 'express'
import { personValidatorZod } from '@sharedAPI/middlewares/personValidatorZod'
import { verifyCPFExist } from '@sharedAPI/middlewares/verifyCPFExist'
import { fromZodError } from 'zod-validation-error'

export default async function CreatePatientMiddleware(
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

  if (cpfExist) {
    return response
      .status(400)
      .json({ status: 400, message: 'CPF já cadastrado' })
  }

  next()
}
