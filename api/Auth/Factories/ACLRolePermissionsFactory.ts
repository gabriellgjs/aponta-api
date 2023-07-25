import { Request } from 'express';

export default class ACLRolePermissionsFactory {
  static fromRequest(request: Request) {
    const { role_id }  = request.params;

    const permissions : number[] = request.body.permissions;

    return {
      role_id,
      permissionsIds: permissions,
    };
  }
}
