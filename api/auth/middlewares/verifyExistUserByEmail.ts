import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export default async function verifyExistUserByEmail(email: string) {
  try {
    return await PrismaConnection.user.findUnique({
      where: { email },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao deletar um cargo')
  }
}
