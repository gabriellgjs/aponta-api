import { Request, Response } from 'express'
import ACLUserPermissionsFactory from '../factories/ACLUserPermissionsFactory'
import UserPermissionsModel from '../models/userPermissionsModel'
import { InternalServerError } from '@apiErrors/errors'

export default class ACLUserPermissionsController {
  public async createUserPermissions(request: Request, response: Response) {
    try {
      const { userId, permissionsIds } =
        ACLUserPermissionsFactory.fromRequest(request)

      const userPermissions = new UserPermissionsModel().saveUserPermissions({
        userId,
        permissionsIds,
      })

      return response.status(201).json(userPermissions)
    } catch (error) {
      if (error instanceof InternalServerError)
        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
    }
  }
}
