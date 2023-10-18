import regexName from '@sharedAPI/utils/regex/regexName'
import { verifyRoleSchema } from '@sharedAPI/utils/zod/zodVerifySchemas'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import VerifyInAndRoleExist from './verifyIdAndRoleExist'

export default async function UpdateRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewareUpdateRole(request, response, next)
  const { id } = request.params

  await VerifyInAndRoleExist(Number(id))
}

const verifyMiddlewareUpdateRole = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
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

  verifyRoleSchema(roleSchema, request)

  next()
}
