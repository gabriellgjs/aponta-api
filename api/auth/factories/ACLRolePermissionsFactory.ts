import { Request } from 'express'

export default class ACLRolePermissionsFactory {
  static fromRequest(request: Request) {
    const { roleId } = request.params

    const permissions: number[] = request.body.permissions

    return {
      roleId,
      permissionsIds: permissions,
    }
  }
}
