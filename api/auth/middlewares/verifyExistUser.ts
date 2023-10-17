import { UnauthorizedError } from '@apiErrors/errors'
import prismaConnection from '@prisma/prismaConnection'
import { compare } from 'bcryptjs'
import { Request } from 'express'

export default async function verifyExistUser(request: Request) {
  const user = await prismaConnection.user.findUnique({
    where: { email: request.body.email },
  })

  if (!user) throw new UnauthorizedError('Email ou senha inválidos.')

  const passwordIsMatch = await compare(request.body.password, user.password)

  if (!passwordIsMatch) throw new UnauthorizedError('Email ou senha inválidos.')
}
