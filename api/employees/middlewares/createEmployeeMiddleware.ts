import { NextFunction, Request, Response, response } from 'express'
import { z } from 'zod'

import personValidatorZod from '@sharedAPI/middlewares/personValidatorZod'
import regexDate from '@sharedAPI/utils/regex/regexDate'
import { verifyEmployeeSchema } from '@sharedAPI/utils/zod/zodVerifySchemas'

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
  const Person = await personValidatorZod(request, response)

  const EmployeeSchema = z.object({
    hireDate: z
      .string({
        required_error: 'Data de admissão é obrigatória',
        invalid_type_error: 'Data de admissão inválida',
      })
      .min(1, 'Data de admissão é obrigatória')
      .regex(regexDate, 'Data inválida'),
  })

  const EmployeeSchemaZodVerify = verifyEmployeeSchema(EmployeeSchema, request)

  // verifyHireDate(EmployeeSchemaZodVerify.data.hireDate, Person.data.birthDate)
  next()
}

// TODO alterar quantidade de caracteres de RG
