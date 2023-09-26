import { prismaConnection } from '@prisma/PrismaConnection';
import { UnauthorizedError } from 'api/Shared/Utils/Error/ApiErrors';
import { compare } from 'bcryptjs';
import { Request } from 'express';

export default async function verifyExistUser(request: Request) {
  const user = await prismaConnection.user.findUnique({
    where: { email: request.body.email},
  });
  
  if (!user) throw new UnauthorizedError('Email ou senha inválidos.');

  const passwordIsMatch = await compare(
    request.body.password,
    user.password,
  );

  if (!passwordIsMatch) throw new UnauthorizedError('Email ou senha inválidos.');
}
