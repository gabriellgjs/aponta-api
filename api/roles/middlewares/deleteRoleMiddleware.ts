import { NextFunction, Request, Response } from 'express'
import verifyRoleExistById from '@rolesAPI/middlewares/verifyRoleExistById'
import verifyRoleExistsInEmployees from '@rolesAPI/middlewares/verifyRoleExistsInEmployees'

export default async function DeleteRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params

  const roleExist = await verifyRoleExistById(id)

  if (!roleExist) {
    return response
      .status(400)
      .json({ status: 400, message: 'Cargo não encontrado' })
  }

  const employeesList = await verifyRoleExistsInEmployees(id)

  if (employeesList.length >= 1) {
    return response.status(400).json({
      status: 400,
      message: 'Cargo não excluído pois está já está sendo usado',
    })
  }

  next()
}
