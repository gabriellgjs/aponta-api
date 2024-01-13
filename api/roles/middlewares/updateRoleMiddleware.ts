import { NextFunction, Request, Response } from 'express'
import verifyRoleExistByName from '@rolesAPI/middlewares/verifyRoleExistByName'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import verifyRoleExistById from '@rolesAPI/middlewares/verifyRoleExistById'
import { roleSchema } from '@rolesAPI/schema/roleSchema'
import { fromZodError } from 'zod-validation-error'

export default async function UpdateRoleMiddleware(
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

  const { id } = request.params

  const roleExistById = await verifyRoleExistById(id)

  if (!roleExistById) {
    return response
      .status(404)
      .json({ status: 404, message: 'Cargo não encontrado' })
  }

  if (roleExistById.name === 'Dentista' || roleExistById.id === 2) {
    return response
      .status(400)
      .json({ status: 400, message: `Cargo 'Dentista' não pode ser alterado` })
  }

  const { name } = request.body

  const roleExistByName = await verifyRoleExistByName(name)

  if (roleExistByName) {
    return response
      .status(400)
      .json({ status: 400, message: 'Esse nome já está cadastrado' })
  }

  next()
}
