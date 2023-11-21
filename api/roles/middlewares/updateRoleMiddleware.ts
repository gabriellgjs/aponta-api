import regexName from '@sharedAPI/utils/regex/regexName'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import verifyRoleExist from '@rolesAPI/middlewares/verifyRoleExist'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'

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

export default async function UpdateRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySchemaZod(roleSchema, request, response)

  const { id } = request.params

  await verifyRoleExist(Number(id), response)

  next()
}
