import Permission from '@permissions/domain/entities/permission'
import PermissionRepository from '@permissions/infra/repositories/permissionsRepository'
import CreatePermissionInputData from '../dtos/createPermissionInputData'

export default class CreatePermissionAction {
  async execute(input: CreatePermissionInputData): Promise<Permission | void> {
    const permissionRepository = new PermissionRepository()

    const permission = new Permission({
      name: input.name.trim(),
      description: input.description.trim(),
    })

    return await permissionRepository.save(permission)
  }
}
