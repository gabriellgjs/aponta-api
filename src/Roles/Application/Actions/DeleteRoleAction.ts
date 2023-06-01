import RoleRepository from '../../Infra/Repositories/RoleRepository';
import DeleteRoleInputData from '../Dtos/DeleteRoleInputData';

export default class DeleteRoleAction {
  async execute(input: DeleteRoleInputData): Promise<void> {
    const roleRepository = new RoleRepository();

    return await roleRepository.delete(input.id);
  }
}
