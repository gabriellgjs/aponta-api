import { Request } from 'express';
import UpdateRoleInputData from '@src/Roles/Application/Dtos/UpdateRoleInputData';
import { Role } from '@prisma/client';

export default class UpdateRoleFactory {
  static fromRequest(request: Request) {
    const { id } = request.params;
    const { name } = request.body;
    const { status } = request.body;

    return new UpdateRoleInputData(Number(id), name, status);
  }

  static fromCurrentRole(role: Role | null) {
    return new UpdateRoleInputData(role!.id, role!.name, role!.status);
  }
}
