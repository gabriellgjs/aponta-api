import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import patientValidatorZod from '@sharedAPI/middlewares/patientValidatorZod'
import personValidatorZod from '@sharedAPI/middlewares/personValidatorZod'
import GeneratorErrorResponse from '@apiErrors/helpers/generatorErrorMessages'
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
  const Person = await personValidatorZod(request)
  await patientValidatorZod(request)

  const EmployeeSchema = z.object({
    hireDate: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeDateOrRequired(
          'hire_date',
        ),
      )
      .datetime(),
  })

  const EmployeeSchemaZodVerify = verifyEmployeeSchema(EmployeeSchema, request)

  verifyHireDate(EmployeeSchemaZodVerify.data.hireDate, Person.data.birth_date)
  next()
}

// TODO alterar quantidade de caracteres de RG
