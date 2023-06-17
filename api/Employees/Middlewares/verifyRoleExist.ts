import { prismaConnection } from "@prisma/PrismaConnection";
import { BadRequestError } from "api/Shared/Utils/Error/ApiErrors";

export default async function verifyRoleExist (role_id: number) {
  const role = await prismaConnection.role.findUnique({
    where: { id: role_id },
  });

  if (!role) throw new BadRequestError('Cargo não encontrado.');
};
