import { verifySetTerminationDateSchema } from '@sharedAPI/utils/zod/zodVerifySchemas'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import verifyTerminationDate from './verifyTerminationDate'

export default async function SetTerminationDateMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySetTerminationDateMiddleware(request, response, next)
}

const verifySetTerminationDateMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const SetTerminationDateSchema = z.object({
    employeeId: z.number().positive(),
    terminationDate: z.string().datetime().nullable(),
  })

  const { terminationDate, employeeId } = verifySetTerminationDateSchema(
    SetTerminationDateSchema,
    request,
  ).data

  await verifyTerminationDate(terminationDate, employeeId)

  next()
}
