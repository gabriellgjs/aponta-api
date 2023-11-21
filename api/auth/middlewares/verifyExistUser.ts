import PrismaConnection from '@prisma/prismaConnection'
import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import Sentry from '../../application/sentry'
import { BadRequestError } from '@apiErrors/errors'

export default async function verifyExistUser(
  request: Request,
  response: Response,
) {
  try {
    const user = await PrismaConnection.user.findUnique({
      where: { email: request.body.email },
    })
    if (!user) throw new BadRequestError('Email ou senha inválidos.')

    const passwordIsMatch = await compare(request.body.password, user.password)

    if (!passwordIsMatch) throw new BadRequestError('Email ou senha inválidos.')
  } catch (error) {
    if (error instanceof BadRequestError) {
      await Sentry.sendError(error.nameError, error.message)
      return response.status(401).json({ message: error.message }).end()
    }
  }
}
