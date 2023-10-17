import PrismaConnection from '@prisma/prismaConnection'
import { NotFoundError } from '@apiErrors/errors'

export default async function verifyEmployeeExist(employeeId: number) {
  const employee = await PrismaConnection.employee.findFirst({
    where: { id: employeeId },
  })

  if (!employee) throw new NotFoundError('Funcionário não encontrado.')
}
