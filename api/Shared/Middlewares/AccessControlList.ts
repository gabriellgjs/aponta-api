import { prismaConnection } from "@prisma/PrismaConnection";
import { NextFunction, Request, Response } from "express";

export function is(roleRouter: string[]) {
  return async(request: Request, response: Response, next: NextFunction) => {
    const user_id  =  response.locals.user.id; 

    const roleUser = await prismaConnection.user.findUnique({
      where: { id: user_id}, select: {role_id: true} 
    });

    const roleName = await prismaConnection.role.findUnique({
      where: { id: roleUser?.role_id}, select: {name: true}
    })

    const isEquals = roleRouter.includes(roleName!.name);
    if(isEquals) {
      return next();
    }

    return response.status(401).end();
  }
}