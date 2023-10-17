import Permission from '@permissions/domain/entities/permission'
import PermissionsModel from '../models/permissionsModel'

export default class PermissionsRepository {
  private permissionsModel: PermissionsModel

  constructor() {
    this.permissionsModel = new PermissionsModel()
  }

  async save(permission: Permission) {
    if (permission.id) {
      return this.update(permission)
    }

    return this.create(permission)
  }

  async create(permission: Permission): Promise<Permission> {
    const permissionCreated =
      await this.permissionsModel.createPermission(permission)

    permission.id = permissionCreated?.id

    return permission
  }

  async update(permission: Permission): Promise<void> {
    await this.permissionsModel.updatePermission(permission)
  }

  async delete(permissionId: number): Promise<void> {
    await this.permissionsModel.deletePermission(permissionId)
  }
}
