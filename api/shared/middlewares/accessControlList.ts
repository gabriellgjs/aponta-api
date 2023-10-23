import PrismaConnection from '@prisma/prismaConnection'
import { NextFunction, Request, Response } from 'express'

export function is(roleRouter: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const userId = response.locals.user.id

    const roleUser = await PrismaConnection.user.findUnique({
      where: { id: userId },
      select: { roleId: true },
    })

    const roleName = await PrismaConnection.role.findUnique({
      where: { id: roleUser?.roleId },
      select: { name: true },
    })

    const isEquals = roleRouter.includes(roleName?.name ?? '')
    if (isEquals) {
      return next()
    }

    return response.status(401).end()
  }
}
