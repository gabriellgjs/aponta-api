import { NextFunction, Request, Response } from 'express'
import { verifyEmailExist } from '@sharedAPI/middlewares/verifyEmailExist'
import { verifyCPFExist } from '@sharedAPI/middlewares/verifyCPFExist'
import { verifyRoleExist } from '@sharedAPI/middlewares/verifyRoleExist'
import { verifyEmployeeExist } from '@sharedAPI/middlewares/verifyEmployeeExist'
import { personValidatorZod } from '@sharedAPI/middlewares/personValidatorZod'
import { fromZodError } from 'zod-validation-error'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { employeeSchema } from '@employeesAPI/schema/employeeSchema'

export default async function UpdateEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const id = request.params.id

  const employeeExistById = await verifyEmployeeExist(id)

  if (!employeeExistById) {
    return response
      .status(404)
      .json({ status: 404, message: 'Funcionário não encontrado' })
  }

  const personSchemaVerification = await personValidatorZod(request)

  if (!personSchemaVerification.success) {
    return response.status(400).json({
      status: 400,
      message:
        fromZodError(personSchemaVerification.error).details[0].message ?? '',
    })
  }

  const employeeSchemaVerification = await verifySchemaZod(
    employeeSchema,
    request,
  )

  if (!employeeSchemaVerification.success) {
    return response.status(400).json({
      status: 400,
      message:
        fromZodError(employeeSchemaVerification.error).details[0].message ?? '',
    })
  }

  const {
    user: { email, roleId },
    cpf,
  } = request.body

  const emailExist = await verifyEmailExist(email)
  const isSameUserEmail = emailExist?.id !== Number(id)

  if (emailExist && isSameUserEmail) {
    return response
      .status(400)
      .json({ status: 400, message: 'Email já cadastrado' })
  }

  const cpfExist = await verifyCPFExist(cpf)
  const isSameCPF = cpfExist?.id !== Number(id)

  if (cpfExist && isSameCPF) {
    return response
      .status(400)
      .json({ status: 400, message: 'CPF já cadastrado' })
  }

  const roleExist = await verifyRoleExist(roleId)

  if (!roleExist) {
    return response
      .status(404)
      .json({ status: 404, message: 'Cargo não encontrado' })
  }

  next()
}
