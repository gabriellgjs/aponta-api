import express, { Router } from 'express'
import RolesController from '../controllers/rolesController'
import CreateRoleMiddleware from '../middlewares/createRoleMiddleware'
import DeleteRoleMiddleware from '../middlewares/deleteRoleMiddleware'
import UpdateRoleMiddleware from '../middlewares/updateRoleMiddleware'

export default class RolesRoutes {
  private rolesController: RolesController
  private rolesRoutes: Router

  constructor() {
    this.rolesController = new RolesController()
    this.rolesRoutes = express.Router()
    this.routes()
  }

  public async routes() {
    const getRole = this.rolesController.getRole.bind(this.rolesController)

    const getRoles = this.rolesController.getRoles.bind(this.rolesController)

    const createRole = this.rolesController.createRole.bind(
      this.rolesController,
    )

    const updateRole = this.rolesController.updateRole.bind(
      this.rolesController,
    )

    const deleteRole = this.rolesController.deleteRole.bind(
      this.rolesController,
    )

    this.rolesRoutes.get('/', getRoles)

    this.rolesRoutes.get('/:id', getRole)

    this.rolesRoutes.post('/', CreateRoleMiddleware, createRole)

    this.rolesRoutes.put('/:id', UpdateRoleMiddleware, updateRole)

    this.rolesRoutes.delete('/:id', DeleteRoleMiddleware, deleteRole)
  }

  get RolesRoutes() {
    return this.rolesRoutes
  }
}
