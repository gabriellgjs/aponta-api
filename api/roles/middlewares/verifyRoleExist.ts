import { NotFoundError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'
import Sentry from '../../application/sentry'
import { Response } from 'express'

export default async function verifyRoleExist(
  roleId: number,
  response: Response,
) {
  try {
    const role = await PrismaConnection.role.findFirst({
      where: { id: roleId },
    })

    if (!role) throw new NotFoundError('Cargo não encontrado.')
  } catch (error) {
    if (error instanceof NotFoundError) {
      await Sentry.sendError(error.nameError, error.message)

      return response
        .status(error.statusCode)
        .json({ message: error.message })
        .end()
    }
  }
}
