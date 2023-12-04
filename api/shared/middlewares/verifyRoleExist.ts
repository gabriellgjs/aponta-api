import PrismaConnection from '@prisma/prismaConnection'
import { BadRequestError, InternalServerError } from '@apiErrors/errors'
import { Response } from 'express'

export const verifyRoleExist = async (role: number, response: Response) => {
  try {
    const RoleExist = await PrismaConnection.role.findUnique({
      where: {
        id: role,
      },
    })

    if (!RoleExist) {
      throw new BadRequestError('RoleId não encontrado')
    }
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof InternalServerError
    ) {
      return response
        .status(error.statusCode)
        .json({ status: error.statusCode, message: error.message })
        .end()
    }
  }
}
