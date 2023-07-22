import UpdatePermissionInputData from '@src/Permissions/Application/Dtos/UpdatePermissionInputData';
import { Request } from 'express';
import { updatePermissionActual } from '../Types/PermissionsTypes';

export default class UpdateRoleFactory {
  static fromRequest(request: Request) {
    const { id } = request.params;
    const { name } = request.body;
    const { description } = request.body;

    return new UpdatePermissionInputData(Number(id), name, description);
  }

  static fromCurrentPermission(permission: updatePermissionActual) {
    return new UpdatePermissionInputData(permission!.id, permission!.name, permission!.description);
  }
}
