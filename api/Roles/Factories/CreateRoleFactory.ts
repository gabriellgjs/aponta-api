import { Request } from 'express';
import CreateRoleInputData from '@src/Roles/Application/Dtos/CreateRoleInputData';

export default class CreateRoleFactory {
  static fromRequest(request: Request) {
    const { name } = request.body;
    const { description } = request.body;

    
    return new CreateRoleInputData(name, description);
  }
}
