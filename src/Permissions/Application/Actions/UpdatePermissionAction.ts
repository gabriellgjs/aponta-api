import Permission from '../../Domain/Entities/Permission';
import PermissionRepository from '../../Infra/Repositories/PermissionRepository';
import UpdatePermissionInputData from '../Dtos/UpdatePermissionInputData';

export default class UpdatePermissionAction {
  async execute(
    input: UpdatePermissionInputData,
    actual: UpdatePermissionInputData,
  ) {
    const permissionRepository = new PermissionRepository();

    const role = new Permission({
      id: actual.id,
      name: input.name.trim() ?? actual.name.trim(),
      description: input.description.trim() ?? actual.description.trim(),
    });

    return await permissionRepository.save(role);
  }
}
