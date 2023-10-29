import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import personValidatorZod from '@sharedAPI/middlewares/personValidatorZod'
import { verifyEmployeeSchema } from '@sharedAPI/utils/zod/zodVerifySchemas'
import verifyHireDate from './verifyHireDate'
import VerifyInAndEmployeeExist from './verifyIdAndEmployeeExist'
export default async function UpdateEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewaresEmployee(request, response, next)

  const { id } = request.params

  await VerifyInAndEmployeeExist(Number(id))
}

const verifyMiddlewaresEmployee = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const Person = await personValidatorZod(request, response)

  const EmployeeSchema = z.object({
    hireDate: z.string(),
  })

  const EmployeeSchemaZodVerify = verifyEmployeeSchema(EmployeeSchema, request)

  // verifyHireDate(EmployeeSchemaZodVerify.data.hireDate, Person.data.birthDate)
  next()
}

// TODO alterar quantidade de caracteres de RG
