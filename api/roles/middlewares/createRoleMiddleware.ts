import { NextFunction, Request, Response } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import verifyRoleExistByName from '@rolesAPI/middlewares/verifyRoleExistByName'
import { roleSchema } from '@rolesAPI/schema/roleSchema'

export default async function CreateRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySchemaZod(roleSchema, request, response)

  const { name } = request.body

  const roleExist = await verifyRoleExistByName(name)

  if (roleExist) {
    return response
      .status(400)
      .json({ status: 400, message: 'Esse nome já está cadastrado' })
  }

  next()
}
