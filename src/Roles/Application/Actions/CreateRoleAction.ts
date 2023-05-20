import Role from "../../Domain/Entities/Role";
import RoleRepository from "../../Infra/Repositories/RoleRepository";
import CreateRoleInputData from "../Dtos/CreateRoleInputData";

export default class CreateRoleAction {
  async execute(input: CreateRoleInputData): Promise<Role> {
    const roleRepository = new RoleRepository();

    const role = new Role({
      name: input.name
    });

    return await roleRepository.create(role);
  }
}