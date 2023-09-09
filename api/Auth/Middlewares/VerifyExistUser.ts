import { prismaConnection } from '@prisma/PrismaConnection';
import { BadRequestError } from 'api/Shared/Utils/Error/ApiErrors';
import { compare } from 'bcryptjs';
import { Request } from 'express';

export default async function verifyExistUser(request: Request) {
  const user = await prismaConnection.user.findUnique({
    where: { email: request.body.email},
  });
  
  if (!user) throw new BadRequestError('Email ou senha inválidos.');

  console.log(user, "email")
  const passwordIsMatch = await compare(
    request.body.password,
    user.password,
  );

  console.log(passwordIsMatch, "senha")
  if (!passwordIsMatch) throw new BadRequestError('Email ou senha inválidos.');
}
