import { NextFunction, Request, Response } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { verifyEmailExist } from '@sharedAPI/middlewares/verifyEmailExist'
import { changeEmailSchema } from '@employeesAPI/schema/changeEmailSchema'
import { fromZodError } from 'zod-validation-error'
import { verifyEmployeeExist } from '@sharedAPI/middlewares/verifyEmployeeExist'

export default async function ChangeEmailMiddleware(
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

  const emailSchema = await verifySchemaZod(changeEmailSchema, request)

  if (!emailSchema.success) {
    return response.status(400).json({
      status: 400,
      message: fromZodError(emailSchema.error).details[0].message ?? '',
    })
  }

  const { email } = request.body

  const emailExist = await verifyEmailExist(email)

  if (emailExist) {
    return response
      .status(400)
      .json({ status: 400, message: 'Email já está em uso' })
  }

  next()
}
