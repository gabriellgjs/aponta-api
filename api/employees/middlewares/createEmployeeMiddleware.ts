import { NextFunction, Request, Response } from 'express'
import { verifyCPFExist } from '@sharedAPI/middlewares/verifyCPFExist'
import { verifyRoleExist } from '@sharedAPI/middlewares/verifyRoleExist'
import { verifyEmailExist } from '@sharedAPI/middlewares/verifyEmailExist'
import { verifySchemaEmployee } from '@employeesAPI/middlewares/verifySchemaEmployee'

export default async function CreateEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySchemaEmployee(request, response)

  const {
    user: { email, roleId },
    cpf,
  } = request.body

  const emailExist = await verifyEmailExist(email)

  if (emailExist) {
    return response
      .status(400)
      .json({ status: 400, message: 'Email já cadastrado' })
  }

  const cpfExist = await verifyCPFExist(cpf)

  if (cpfExist) {
    return response
      .status(400)
      .json({ status: 400, message: 'CPF já cadastrado' })
  }

  const roleExist = await verifyRoleExist(roleId)

  if (!roleExist) {
    return response
      .status(400)
      .json({ status: 400, message: 'Cargo não encontrado' })
  }

  next()
}
