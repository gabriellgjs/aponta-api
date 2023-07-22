import { Request } from 'express';

export default class ACLUserPermissionsFactory {
  static fromRequest(request: Request) {
    const { user_id }  = request.params;

    const permissions : number[] = request.body.permissions;
    return {
      user_id,
      permissionsIds: permissions,
    };
  }
}
