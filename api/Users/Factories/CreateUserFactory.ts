import { Request } from 'express';
import CreateRoleInputData from '@src/Roles/Application/Dtos/CreateRoleInputData';
import CreateUserInputData from '@src/User/Application/Dtos/CreateUserInputData';

export default class CreateUserFactory {
  static fromRequest(request: Request) {
    const { email } = request.body;
    const { password } = request.body;
    const { role_id } = request.body;

    return new CreateUserInputData(email, password, role_id);
  }
}
