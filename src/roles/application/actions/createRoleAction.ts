import Role from '@roles/domain/entities/role'
import RoleRepository from '@roles/infra/repositories/rolesRepository'
import CreateRoleInputData from '../dtos/createRoleInputData'

export default class CreateRoleAction {
  async execute(input: CreateRoleInputData): Promise<Role | void> {
    const roleRepository = new RoleRepository()

    const role = new Role({
      name: input.name.trim(),
      description: input.description.trim(),
    })

    return await roleRepository.save(role)
  }
}
