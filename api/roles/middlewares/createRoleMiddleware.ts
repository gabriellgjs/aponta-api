import regexName from '@sharedAPI/utils/regex/regexName'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import verifyRoleExistByName from '@rolesAPI/middlewares/verifyRoleExistByName'

export default async function CreateRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewareCreateRole(request, response, next)
}

const roleSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
      invalid_type_error: 'Nome deve ser uma String',
    })
    .regex(regexName, 'Nome só pode ter letras e acentuações')
    .min(3, 'Nome deve ser maior 3 caracteres')
    .trim(),
})

const verifyMiddlewareCreateRole = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  await verifySchemaZod(roleSchema, request, response)
  await verifyRoleExistByName(request, request.body.name, response)

  next()
}
