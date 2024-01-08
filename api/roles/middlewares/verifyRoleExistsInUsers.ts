import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export default async function verifyRoleExistsInUsers(roleId: string) {
  try {
    return await PrismaConnection.user.findMany({
      where: { roleId: Number(roleId) },
    })
  } catch (error) {
    throw new InternalServerError(
      'Erro ao pesquisar se o cargo já esta sendo usado',
    )
  }
}
