import UpdateRoleInputData from '@src/Roles/Application/Dtos/UpdateRoleInputData';
import { Request } from 'express';
import { updateRoleActual } from '../Types/RolesTypes';

export default class UpdateRoleFactory {
  static fromRequest(request: Request) {
    const { id } = request.params;
    const { name } = request.body;
    const { description } = request.body;

    return new UpdateRoleInputData(Number(id), name, description);
  }

  static fromCurrentRole(role: updateRoleActual) {
    return new UpdateRoleInputData(role!.id, role!.name, role!.description);
  }
}
