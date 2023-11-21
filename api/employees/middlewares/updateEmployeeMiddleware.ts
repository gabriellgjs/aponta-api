import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import personValidatorZod from '@sharedAPI/middlewares/personValidatorZod'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'

const EmployeeSchema = z.object({
  hireDate: z.string(),
})

export default async function UpdateEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewaresEmployee(request, response, next)
}

const verifyMiddlewaresEmployee = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  await personValidatorZod(request, response)

  await verifySchemaZod(EmployeeSchema, request, response)

  next()
}
