import Role from "../../Domain/Entities/Role";
import RoleRepository from "../../Infra/Repositories/RoleRepository";
import UpdateRoleInputData from "../Dtos/UpdateRoleInputData";

export default class DeleteRoleAction {
  async execute(input: UpdateRoleInputData): Promise<void> {
    const roleRepository = new RoleRepository();

    const role = new Role({
      id: input.id,
      name: input.name,
    });

    return await roleRepository.delete(role);
  }
}