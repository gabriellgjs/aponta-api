import Role from '@roles/domain/entities/role'
import RoleRepository from '@roles/infra/repositories/rolesRepository'
import UpdateRoleInputData from '../dtos/updateRoleInputData'

export default class UpdateRoleAction {
  async execute(input: UpdateRoleInputData, actual: UpdateRoleInputData) {
    const roleRepository = new RoleRepository()

    const role = new Role({
      id: actual.id,
      name: input.name.trim() ?? actual.name.trim(),
      description: input.description.trim() ?? actual.description.trim(),
    })

    return await roleRepository.save(role)
  }
}
