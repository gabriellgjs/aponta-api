import regexName from '@sharedAPI/utils/regex/regexName'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'

export default async function CreateRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewareCreateRole(request, response, next)
}

const roleSchema = z.object({
  name: z
    .string()
    .regex(regexName, 'Nome só pode ter letras e acentuações.')
    .trim(),
  description: z
    .string()
    .regex(regexName, 'Descrição só pode ter letras e acentuações.')
    .trim(),
})

const verifyMiddlewareCreateRole = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  await verifySchemaZod(roleSchema, request, response)

  next()
}
