import { NextFunction, Request, Response } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { loginSchema } from '@authAPI/schema/loginSchema'
import { fromZodError } from 'zod-validation-error'
import { comparePassword } from '@sharedAPI/middlewares/comparePassword'
import { verifyEmailExist } from '@sharedAPI/middlewares/verifyEmailExist'

export default async function LoginMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const loginSchemaVerification = await verifySchemaZod(loginSchema, request)

  if (!loginSchemaVerification.success) {
    return response.status(400).json({
      status: 400,
      message:
        fromZodError(loginSchemaVerification.error).details[0].message ?? '',
    })
  }

  const { email, password } = request.body

  const userExist = await verifyEmailExist(email)

  if (!userExist) {
    return response
      .status(400)
      .json({ status: 400, message: 'Email ou senha inválido' })
  }

  const passwordsMatch = await comparePassword(password, userExist.password)

  if (!passwordsMatch) {
    return response
      .status(400)
      .json({ status: 400, message: 'Email ou senha inválido' })
  }

  next()
}
