import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export default async function verifyRoleExistsInEmployees(roleId: string) {
  try {
    return await PrismaConnection.employee.findMany({
      where: { id: Number(roleId) },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao deletar um cargo')
  }
}
