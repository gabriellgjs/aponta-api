import UpdatePermissionInputData from '@permissions/application/dtos/updatePermissionInputData'
import { Request } from 'express'
import { updatePermissionActual } from '../types/permissionsTypes'

export default class UpdateRoleFactory {
  static fromRequest(request: Request) {
    const { id } = request.params
    const { name } = request.body
    const { description } = request.body

    return new UpdatePermissionInputData(Number(id), name, description)
  }

  static fromCurrentPermission(permission: updatePermissionActual) {
    return new UpdatePermissionInputData(
      permission?.id ?? 0,
      permission?.name ?? '',
      permission?.description ?? '',
    )
  }
}
