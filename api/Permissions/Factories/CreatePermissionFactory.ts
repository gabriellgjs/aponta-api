import { Request } from 'express';
import CreatePermissionInputData from '@src/Permissions/Application/Dtos/CreatePermissionInputData';

export default class CreatePermissionFactory {
  static fromRequest(request: Request) {
    const { name } = request.body;
    const { description } = request.body;

    
    return new CreatePermissionInputData(name, description);
  }
}
