import { Request } from 'express';
import UpdateRoleInputData from '@src/Roles/Application/Dtos/UpdateRoleInputData';
import { Role } from '@prisma/client';
import { updateRoleActual } from '../Types/RolesTypes';

export default class UpdateRoleFactory {
  static fromRequest(request: Request) {
    const { id } = request.params;
    const { name } = request.body;

    return new UpdateRoleInputData(Number(id), name);
  }

  static fromCurrentRole(role: updateRoleActual) {
    return new UpdateRoleInputData(role!.id, role!.name);
  }
}
