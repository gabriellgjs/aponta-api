import { Request, Response } from 'express'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@apiErrors/errors'
import CreateRoleAction from '@roles/application/actions/createRoleAction'
import DeleteRoleAction from '@roles/application/actions/deleteRoleAction'
import UpdateRoleAction from '@roles/application/actions/updateRoleAction'
import CreateRoleFactory from '@rolesAPI/factories/createRoleFactory'
import DeleteRoleFactory from '@rolesAPI/factories/deleteRoleFactory'
import UpdateRoleFactory from '@rolesAPI/factories/updateRoleFactory'
import RolesModel from '@rolesAPI/models/rolesModel'
import RoleOutputData from '../dtos/roleOutputData'
import Sentry from '../../application/sentry'

export default class RolesController {
  public async getRole(request: Request, response: Response) {
    try {
      const rolesModel = new RolesModel()

      const { id } = request.params

      const role = await rolesModel.getRole(Number(id))

      if (!role) throw new NotFoundError('Cargo não encontrado')

      return response.status(200).json(role)
    } catch (error) {
      if (
        error instanceof InternalServerError ||
        error instanceof BadRequestError ||
        error instanceof NotFoundError
      ) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
      }
    }
  }

  public async getRoles(request: Request, response: Response) {
    try {
      const rolesModel = new RolesModel()

      const roles = await rolesModel.getRoles()

      return response.status(200).json(RoleOutputData.responseGetRoles(roles))
    } catch (error) {
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
      }
    }
  }

  public async createRole(request: Request, response: Response) {
    try {
      const roleAction = new CreateRoleAction()

      const roleFactory = CreateRoleFactory.fromRequest(request)

      const roleId = (await roleAction.execute(roleFactory))?.id

      return response.status(201).json(roleId)
    } catch (error) {
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
      }
    }
  }

  public async updateRole(request: Request, response: Response) {
    try {
      const roleAction = new UpdateRoleAction()
      const rolesModel = new RolesModel()

      const userDataInput = UpdateRoleFactory.fromRequest(request)

      const actualRole = await rolesModel.getRole(userDataInput.id)

      const actualRoleInput = UpdateRoleFactory.fromCurrentRole(actualRole)

      await roleAction.execute(userDataInput, actualRoleInput)

      return response.status(204).json()
    } catch (error) {
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
      }
    }
  }

  public async deleteRole(request: Request, response: Response) {
    try {
      const roleAction = new DeleteRoleAction()

      const userDataInput = DeleteRoleFactory.fromRequest(request)

      await roleAction.execute(userDataInput)

      return response.status(204).json()
    } catch (error) {
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
      }
    }
  }
}
