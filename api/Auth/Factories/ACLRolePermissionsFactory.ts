import { Request } from 'express';

export default class ACLRolePermissionsFactory {
  static fromRequest(request: Request) {
    const { role_id }  = request.params;

    const permissions : number[] = request.body.permissions;
    console.log(role_id, permissions)

    return {
      role_id,
      permissionsIds: permissions,
    };
  }
}
