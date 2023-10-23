import Role from '@roles/domain/entities/role'
import RolesModel from '../models/rolesModel'

export default class RolesRepository {
  private roleModel: RolesModel

  constructor() {
    this.roleModel = new RolesModel()
  }

  async save(role: Role) {
    if (role.id) {
      return this.update(role)
    }

    return this.create(role)
  }

  async create(role: Role): Promise<Role> {
    const roleCreated = await this.roleModel.createRole(role)

    role.id = roleCreated?.id

    return role
  }

  async update(role: Role): Promise<void> {
    await this.roleModel.updateRole(role)
  }

  async delete(roleId: number): Promise<void> {
    await this.roleModel.deleteRole(roleId)
  }
}
