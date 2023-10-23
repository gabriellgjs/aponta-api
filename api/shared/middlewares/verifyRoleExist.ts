import { NotFoundError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'

export default async function verifyRoleExist(roleId: number) {
  const role = await PrismaConnection.role.findFirst({
    where: { id: roleId },
  })

  if (!role) throw new NotFoundError('Cargo não encontrado.')
}
