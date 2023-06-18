import { prismaConnection } from '@prisma/PrismaConnection';
import { BadRequestError } from 'api/Shared/Utils/Error/ApiErrors';

export default async function VerifyExistEmployeeRegisteredOnRole(
  role_id: number,
) {
  const employeeOnRegisteredOnRole = await prismaConnection.employee.findMany({
    where: {
      role_id,
    },
  });

  if (employeeOnRegisteredOnRole.length > 0)
    throw new BadRequestError(
      'Não é possível excluir o cargo selecionado. Existem funcionários atualmente ocupando esse cargo. Antes de excluir, remova ou reatribua os funcionários.',
    );
}
