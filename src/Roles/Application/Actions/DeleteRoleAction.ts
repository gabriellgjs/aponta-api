import RoleRepository from '../../Infra/Repositories/RoleRepository';
import DeleteRoleInputData from '../Dtos/DeleteRoleInputData';

export default class DeleteRoleAction {
  async execute(input: DeleteRoleInputData) {
    const roleRepository = new RoleRepository();

    return await roleRepository.delete(input.id);
  }
}
