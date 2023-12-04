import { NextFunction, Request, Response } from 'express'
import verifyExistUser from './verifyExistUser'
import { z } from 'zod'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email é obrigatório',
      invalid_type_error: 'Email deve ser uma String',
    })
    .trim()
    .email('Email inválido'),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
      invalid_type_error: 'Senha deve ser uma String',
    })
    .trim(),
})

export default async function LoginMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySchemaZod(loginSchema, request, response)
  await verifyExistUser(request, response)

  next()
}
