import RoleRepository from '@roles/infra/repositories/rolesRepository'
import DeleteRoleInputData from '../dtos/deleteRoleInputData'

export default class DeleteRoleAction {
  async execute(input: DeleteRoleInputData) {
    const roleRepository = new RoleRepository()

    return await roleRepository.delete(input.id)
  }
}
