import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export default async function verifyRoleExistByName(role: string) {
  try {
    return await PrismaConnection.role.findFirst({
      where: { name: role },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao deletar um cargo')
  }
}
