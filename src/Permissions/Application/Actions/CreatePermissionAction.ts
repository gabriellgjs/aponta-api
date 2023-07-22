import Permission from '../../Domain/Entities/Permission';
import PermissionRepository from '../../Infra/Repositories/PermissionRepository';
import CreatePermissionInputData from '../Dtos/CreatePermissionInputData';

export default class CreatePermissionAction {
  async execute(input: CreatePermissionInputData): Promise<Permission | void> {
    const permissionRepository = new PermissionRepository();

    const permission = new Permission({
      name: input.name.trim(),
      description: input.description.trim(),
    });

    return await permissionRepository.save(permission);
  }
}
