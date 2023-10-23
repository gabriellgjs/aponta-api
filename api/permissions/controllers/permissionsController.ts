import { Request, Response } from 'express'

import CreatePermissionAction from '@permissions/application/actions/createPermissionAction'
import DeletePermissionAction from '@permissions/application/actions/deletePermissionAction'
import UpdatePermissionAction from '@permissions/application/actions/updatePermissionAction'
import PermissionsOutputData from '../dtos/permissionsOutputData'
import PermissionsModel from '../models/permissionsModel'
import CreatePermissionFactory from '../factories/createPermissionFactory'
import DeletePermissionFactory from '../factories/deletePermissionFactory'
import UpdatePermissionFactory from '../factories/updatePermissionFactory'
import { InternalServerError, NotFoundError } from '@apiErrors/errors'

export default class PermissionsController {
  public async getPermission(request: Request, response: Response) {
    try {
      const permissionsModel = new PermissionsModel()

      const { id } = request.params

      const permission = await permissionsModel.getPermission(Number(id))

      if (!permission) throw new NotFoundError('Permissão não encontrado')

      return response.status(200).json(permission)
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async getPermissions(request: Request, response: Response) {
    try {
      const permissionsModel = new PermissionsModel()

      const permissions = await permissionsModel.getPermissions()

      return response
        .status(200)
        .json(PermissionsOutputData.responseGetPermissions(permissions))
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async createPermission(request: Request, response: Response) {
    try {
      const permissionAction = new CreatePermissionAction()

      const permissionFactory = CreatePermissionFactory.fromRequest(request)

      const permissionId = (await permissionAction.execute(permissionFactory))
        ?.id

      return response.status(201).json(permissionId)
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async updatePermission(request: Request, response: Response) {
    try {
      const permissionAction = new UpdatePermissionAction()

      const permissionsModel = new PermissionsModel()

      const userDataInput = UpdatePermissionFactory.fromRequest(request)

      const actualPermission = await permissionsModel.getPermission(
        userDataInput.id,
      )

      const actualPermissionInput =
        UpdatePermissionFactory.fromCurrentPermission(actualPermission)

      await permissionAction.execute(userDataInput, actualPermissionInput)

      return response.status(204).json()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async deletePermission(request: Request, response: Response) {
    try {
      const permissionAction = new DeletePermissionAction()

      const userDataInput = DeletePermissionFactory.fromRequest(request)

      await permissionAction.execute(userDataInput)

      return response.status(204).json()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }
}
