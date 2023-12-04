import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export default async function verifyRoleExistById(roleId: string) {
  try {
    return await PrismaConnection.role.findUnique({
      where: { id: Number(roleId) },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao deletar um cargo')
  }
}
