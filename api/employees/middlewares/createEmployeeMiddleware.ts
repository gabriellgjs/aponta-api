import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import personValidatorZod from '@sharedAPI/middlewares/personValidatorZod'
import regexDate from '@sharedAPI/utils/regex/regexDate'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { verifyEmailExist } from '@employeesAPI/middlewares/changeEmailMiddleware'
import { verifyCPFExist } from '@sharedAPI/middlewares/verifyCPFExist'
import { verifyRoleExist } from '@sharedAPI/middlewares/verifyRoleExist'

const EmployeeSchema = z.object({
  hireDate: z
    .string({
      required_error: 'Data de admissão é obrigatória',
      invalid_type_error: 'Data de admissão inválida',
    })
    .min(1, 'Data de admissão é obrigatória')
    .regex(regexDate, 'Data inválida'),
  user: z.object({
    email: z
      .string({
        required_error: 'Email é obrigatório',
        invalid_type_error: 'Email inválido',
      })
      .email('Email inválido'),
    password: z.string({
      required_error: 'Senha é obrigatória',
      invalid_type_error: 'Senha inválida',
    }),
    roleId: z.number(),
  }),
})
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
  await personValidatorZod(request, response)
  await verifySchemaZod(EmployeeSchema, request, response)
  await verifyEmailExist(request.body.user.email, response)
  await verifyCPFExist(request.body.cpf, response)
  await verifyRoleExist(request.body.user.roleId, response)
  next()
}
