import { BadRequestError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'
import { Response, Request } from 'express'
import Sentry from '../../application/sentry'

export default async function verifyRoleExistById(
  request: Request,
  roleId: string,
  response: Response,
) {
  try {
    const roleExist = await PrismaConnection.role.findUnique({
      where: { id: Number(roleId) },
    })

    if (!roleExist) throw new BadRequestError('Cargo não encontrado')
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
