import { prismaConnection } from '@prisma/PrismaConnection';
import { NotFoundError } from 'api/Shared/Utils/Error/ApiErrors';

export default async function verifyEmployeeExist(employee_id: number) {
  const employee = await prismaConnection.employee.findFirst({
    where: { id: employee_id},
  });

  if (!employee) throw new NotFoundError('Funcionário não encontrado.');
}
