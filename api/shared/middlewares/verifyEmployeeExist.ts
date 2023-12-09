import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export const verifyEmployeeExist = async (employeeId: string) => {
  try {
    return await PrismaConnection.employee.findUnique({
      where: {
        id: Number(employeeId),
      },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao buscar funcionário')
  }
}
