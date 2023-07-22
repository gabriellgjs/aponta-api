import { Request } from 'express';
import DeletePermissionInputData from '@src/Permissions/Application/Dtos/DeletePermissionInputData';

export default class DeletePermissionFactory {
  static fromRequest(request: Request) {
    const { id } = request.params;

    return new DeletePermissionInputData(Number(id));
  }
}
