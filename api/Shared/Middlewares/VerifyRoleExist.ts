import { prismaConnection } from '@prisma/PrismaConnection';
import { NotFoundError } from 'api/Shared/Utils/Error/ApiErrors';

export default async function verifyRoleExist(role_id: number) {
  const role = await prismaConnection.role.findFirst({
    where: { id: role_id, status: 'ativo' },
  });

  if (!role) throw new NotFoundError('Cargo não encontrado.');
}
