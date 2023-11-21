import { Request, Response } from 'express'
import ACLRolePermissionsFactory from '../factories/ACLRolePermissionsFactory'
import RolePermissionsModel from '../models/rolePermissionsModel'
import { InternalServerError } from '@apiErrors/errors'

export default class ACLRolePermissionsController {
  public async createRolePermissions(request: Request, response: Response) {
    try {
      const { roleId, permissionsIds } =
        ACLRolePermissionsFactory.fromRequest(request)

      const RolePermissions = new RolePermissionsModel().saveRolePermissions({
        roleId,
        permissionsIds,
      })

      return response.status(201).json(RolePermissions).end()
    } catch (error) {
      if (error instanceof InternalServerError)
        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
    }
  }
}
