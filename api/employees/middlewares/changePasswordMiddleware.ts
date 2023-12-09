import { NextFunction, Request, Response } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { changePasswordSchema } from '@employeesAPI/schema/changePasswordSchema'
import { fromZodError } from 'zod-validation-error'
import { verifyPassword } from '@sharedAPI/middlewares/verifyPassword'
import { comparePassword } from '@sharedAPI/middlewares/comparePassword'

export default async function ChangePasswordMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const id = request.params.id

  const hashExist = await verifyPassword(Number(id))

  if (!hashExist) {
    return response.status(400).json({
      status: 400,
      message: 'Funcionário não encontrado',
    })
  }

  const changePasswordRequest = await verifySchemaZod(
    changePasswordSchema,
    request,
  )

  if (!changePasswordRequest.success) {
    return response.status(400).json({
      status: 400,
      message:
        fromZodError(changePasswordRequest.error).details[0].message ?? '',
    })
  }

  const { currentPassword } = request.body

  const hashMatchCurrentRequestPassword = await comparePassword(
    currentPassword,
    hashExist,
  )

  if (!hashMatchCurrentRequestPassword) {
    return response.status(400).json({
      status: 400,
      message: 'Senha atual incorreta',
    })
  }

  next()
}
