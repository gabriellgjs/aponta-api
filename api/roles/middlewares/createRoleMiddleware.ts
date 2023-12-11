import { NextFunction, Request, Response } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import verifyRoleExistByName from '@rolesAPI/middlewares/verifyRoleExistByName'
import { roleSchema } from '@rolesAPI/schema/roleSchema'
import { fromZodError } from 'zod-validation-error'

export default async function CreateRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const schemaSuccess = await verifySchemaZod(roleSchema, request)

  if (!schemaSuccess.success) {
    return response.status(400).json({
      status: 400,
      message: fromZodError(schemaSuccess.error).details[0].message ?? '',
    })
  }

  const { name } = request.body

  const roleExist = await verifyRoleExistByName(name)

  if (roleExist) {
    return response
      .status(400)
      .json({ status: 400, message: 'Esse nome já está cadastrado' })
  }

  next()
}
