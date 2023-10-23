import Permission from '@permissions/domain/entities/permission'
import PermissionRepository from '@permissions/infra/repositories/permissionsRepository'
import UpdatePermissionInputData from '../dtos/updatePermissionInputData'

export default class UpdatePermissionAction {
  async execute(
    input: UpdatePermissionInputData,
    actual: UpdatePermissionInputData,
  ) {
    const permissionRepository = new PermissionRepository()

    const role = new Permission({
      id: actual.id,
      name: input.name.trim() ?? actual.name.trim(),
      description: input.description.trim() ?? actual.description.trim(),
    })

    return await permissionRepository.save(role)
  }
}
