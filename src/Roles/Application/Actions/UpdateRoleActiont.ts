import Role from "../../Domain/Entities/Role";
import RoleRepository from "../../Infra/Repositories/RoleRepository";
import UpdateRoleInputData from "../Dtos/UpdateRoleInputData";

export default class UpdateRoleAction {
  async execute(input: UpdateRoleInputData, actual: UpdateRoleInputData): Promise<void> {
    const roleRepository = new RoleRepository();

    const role = new Role({
      id: actual.id,
      name: input.name,
      status: input.status? input.status : actual.status,
    });

    return await roleRepository.update(role);
  }
}