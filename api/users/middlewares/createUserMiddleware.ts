import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

import { BadRequestError } from '@apiErrors/errors'
import GeneratorErrorResponse from '@apiErrors/helpers/generatorErrorMessages'
import PrismaConnection from '@prisma/prismaConnection'

export default async function CreateUserMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const createUserSchema = z.object({
    email: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'email',
        ),
      )
      .email(GeneratorErrorResponse.generateErrorMessageEmail()),
    password: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'password',
        ),
      )
      .min(
        6,
        GeneratorErrorResponse.generateErrorMessageMinLength('password', 6),
      ),
    role_id: z.number(),
  })

  const isParseSuccess = createUserSchema.safeParse(request.body)

  if (!isParseSuccess.success) {
    const { message } = fromZodError(isParseSuccess.error)

    throw new BadRequestError(
      GeneratorErrorResponse.messageResponseError(message),
    )
  }

  const userExist = await PrismaConnection.user.findFirst({
    where: {
      email: isParseSuccess.data.email,
    },
  })

  if (userExist) throw new BadRequestError('Usuário já existe!')

  next()
}
