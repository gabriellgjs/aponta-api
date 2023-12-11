import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export const verifyCPFExist = async (cpf: string) => {
  try {
    return await PrismaConnection.people.findUnique({
      where: { cpf },
      select: {
        id: true,
        patient: true,
        employee: true,
      },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao realizar login')
  }
}
