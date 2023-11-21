import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import PrismaConnection from '@prisma/prismaConnection'
import { compare } from 'bcryptjs'
import { BadRequestError } from '@apiErrors/errors'
import Sentry from '../../application/sentry'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
})

const verifyPasswordMatch = async (
  id: number,
  passwordRequest: string,
  response: Response,
) => {
  try {
    const passwordHash = await PrismaConnection.user
      .findUnique({
        where: {
          id,
        },
        select: {
          password: true,
        },
      })
      .then((value) => {
        return value?.password
      })

    const passwordIsMatch = await compare(passwordRequest, passwordHash ?? '')

    if (!passwordIsMatch) {
      throw new BadRequestError('A senha atual está incorreta')
    }
  } catch (error) {
    if (error instanceof BadRequestError) {
      await Sentry.sendError(error.nameError, error.message)

      return response
        .status(error.statusCode)
        .json({ message: error.message })
        .end()
    }
  }
}
export default async function ChangePasswordMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params

  await verifySchemaZod(changePasswordSchema, request, response)
  await verifyPasswordMatch(Number(id), request.body.currentPassword, response)

  next()
}
