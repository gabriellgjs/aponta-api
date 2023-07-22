import Permission from '../../Domain/Entities/Permission';
import PermissionsModel from '../Models/PermissionsModel';

export default class PermissionRepository {
  private permissionsModel: PermissionsModel;

  constructor() {
    this.permissionsModel = new PermissionsModel();
  }

  async save(permission: Permission) {
    if (permission.id) {
      return this.update(permission);
    }

    return this.create(permission);
  }

  async create(permission: Permission): Promise<Permission> {
    const permission_created = await this.permissionsModel.createPermission(permission);

    permission.id = permission_created!.id;

    return permission;
  }

  async update(permission: Permission): Promise<void> {
    await this.permissionsModel.updatePermission(permission);
  }

  async delete(permission_id: number): Promise<void> {
    await this.permissionsModel.deletePermission(permission_id);
  }
}
