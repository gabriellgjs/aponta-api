import { verifySetUserIdSchema } from '@sharedAPI/utils/zod/zodVerifySchemas'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export default async function SetUserIdMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySetUserIdMiddleware(request, response, next)
}

const verifySetUserIdMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const SetUserIdSchema = z.object({
    employeeId: z.number().positive(),
    userId: z.number().positive(),
  })

  verifySetUserIdSchema(SetUserIdSchema, request)

  next()
}
