import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export const verifyRoleExist = async (roleId: number) => {
  try {
    return await PrismaConnection.role.findUnique({
      where: {
        id: roleId,
      },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao realizar login')
  }
}
