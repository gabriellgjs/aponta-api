import { BadRequestError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'
import { Response, Request } from 'express'
import Sentry from '../../application/sentry'

export default async function verifyRoleExistByName(
  request: Request,
  role: string,
  response: Response,
) {
  try {
    const roleExist = await PrismaConnection.role.findFirst({
      where: { name: role },
    })

    if (roleExist) throw new BadRequestError('Este nome de cargo já existe')
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
