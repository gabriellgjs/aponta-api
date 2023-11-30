import PrismaConnection from '@prisma/prismaConnection'
import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { UnauthorizedError } from '@apiErrors/errors'
import Sentry from '../../application/sentry'

export default async function verifyExistUser(
  request: Request,
  response: Response,
) {
  try {
    const userExist = await PrismaConnection.user.findUnique({
      where: { email: request.body.email },
    })
    if (!userExist) {
      throw new UnauthorizedError('Email ou senha inválidos')
    }

    const passwordIsMatch = await compare(
      request.body.password,
      userExist.password,
    )

    if (!passwordIsMatch) {
      throw new UnauthorizedError('Email ou senha inválidos')
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      await Sentry.sendError(error.nameError, error.message)
      return response
        .status(error.statusCode)
        .json({ status: error.statusCode, message: error.message })
        .end()
    }
  }
}
