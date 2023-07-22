import PermissionRepository from '../../Infra/Repositories/PermissionRepository';
import DeletePermissionInputData from '../Dtos/DeletePermissionInputData';

export default class DeletePermissionAction {
  async execute(input: DeletePermissionInputData) {
    const permissionRepository = new PermissionRepository();

    return await permissionRepository.delete(input.id);
  }
}
