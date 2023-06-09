import Role from '../../Domain/Entities/Role';
import RolesModel from '../Models/RolesModel';

export default class RoleRepository {
  private roleModel: RolesModel;

  constructor() {
    this.roleModel = new RolesModel();
  }

  async save(role: Role) {
    if (role.id) {
      this.update(role);
    }

    return this.create(role);
  }

  async create(role: Role): Promise<Role> {
    const role_created = await this.roleModel.createRole(role);

    role.id = role_created!.id;

    return role;
  }

  async update(role: Role): Promise<void> {
    await this.roleModel.updateRole(role);
  }

  async delete(role_id: number): Promise<void> {
    await this.roleModel.deleteRole(role_id);
  }
}
