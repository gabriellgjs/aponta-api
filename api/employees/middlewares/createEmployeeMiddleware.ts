import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import personValidatorZod from '@sharedAPI/middlewares/personValidatorZod'
import GeneratorErrorResponse from '@apiErrors/helpers/generatorErrorMessages'
import { verifyEmployeeSchema } from '@sharedAPI/utils/zod/zodVerifySchemas'
import verifyHireDate from './verifyHireDate'
import patientValidatorZod from '@sharedAPI/middlewares/patientValidatorZod'

export default async function CreateEmployeeMiddleware(
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
  const Person = await personValidatorZod(request)
  await patientValidatorZod(request)

  const EmployeeSchema = z.object({
    hireDate: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeDateOrRequired(
          'hireDate',
        ),
      )
      .datetime(),
  })

  const EmployeeSchemaZodVerify = verifyEmployeeSchema(EmployeeSchema, request)

  verifyHireDate(EmployeeSchemaZodVerify.data.hireDate, Person.data.birth_date)
  next()
}

// TODO alterar quantidade de caracteres de RG
