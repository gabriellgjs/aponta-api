import Role from "../../Domain/Entities/Role";
import RolesModel from "../Models/RolesModel";

export default class RoleRepository {
  private roleModel: RolesModel;

  constructor() {
    this.roleModel = new RolesModel();
  }

  async create(role: Role): Promise<Role> {
    const { id } = await this.roleModel.createRole(role);

    role.id = id;

    return role;
  }

  async update(role: Role): Promise<void> {
     await this.roleModel.updateRole(role);
  }

  async delete(role: Role): Promise<void> {
    await this.roleModel.deleteRole(role);
  }
}

//TODO verificar se existe a necessidade de um metodo save()