import { NextFunction, Request, Response } from 'express'
import verifyRoleExistById from '@rolesAPI/middlewares/verifyRoleExistById'
import verifyRoleExistsInUsers from '@rolesAPI/middlewares/verifyRoleExistsInUsers'

export default async function DeleteRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params

  const roleExist = await verifyRoleExistById(id)

  if (!roleExist) {
    return response
      .status(404)
      .json({ status: 404, message: 'Cargo não encontrado' })
  }

  const employeesList = await verifyRoleExistsInUsers(id)

  if (employeesList.length >= 1) {
    return response.status(400).json({
      status: 400,
      message: 'Cargo não excluído pois está já está sendo usado',
    })
  }

  if (
    roleExist.name === 'Administrador'
    ) {
    return response.status(400).json({
      status: 400,
      message: 'Não é possível deletar cargo de Administrador',
    })
  }

  if (
    roleExist.name === 'Dentista'
    ) {
    return response.status(400).json({
      status: 400,
      message: 'Não é possível deletar cargo de Dentista',
    })
  }

  if (
    roleExist.name === 'Secretário'
    ) {
    return response.status(400).json({
      status: 400,
      message: 'Não é possível deletar cargo de Secretário',
    })
  }

  next()
}
