import PermissionRepository from '@permissions/infra/repositories/permissionsRepository'
import DeletePermissionInputData from '../dtos/deletePermissionInputData'

export default class DeletePermissionAction {
  async execute(input: DeletePermissionInputData) {
    const permissionRepository = new PermissionRepository()

    return await permissionRepository.delete(input.id)
  }
}
