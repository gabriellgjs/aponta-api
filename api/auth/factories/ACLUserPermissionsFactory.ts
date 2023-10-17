import { Request } from 'express'

export default class ACLUserPermissionsFactory {
  static fromRequest(request: Request) {
    const { userId } = request.params

    const permissions: number[] = request.body.permissions
    return {
      userId,
      permissionsIds: permissions,
    }
  }
}
