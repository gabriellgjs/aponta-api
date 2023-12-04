import UpdateRoleInputData from '@roles/application/dtos/updateRoleInputData'
import { Request } from 'express'
import { updateRoleActual } from '../types/rolesTypes'

export default class UpdateRoleFactory {
  static fromRequest(request: Request) {
    const { id } = request.params
    const { name } = request.body

    return new UpdateRoleInputData(Number(id), name)
  }

  static fromCurrentRole(role: updateRoleActual) {
    return new UpdateRoleInputData(role?.id ?? 0, role?.name ?? '')
  }
}
