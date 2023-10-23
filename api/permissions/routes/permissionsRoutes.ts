import express, { Router } from 'express'
import PermissionsController from '../controllers/permissionsController'
export default class PermissionsRoutes {
  private permissionsController: PermissionsController
  private permissionsRoutes: Router

  constructor() {
    this.permissionsController = new PermissionsController()
    this.permissionsRoutes = express.Router()
    this.routes()
  }

  public async routes() {
    const getPermission = this.permissionsController.getPermission.bind(
      this.permissionsController,
    )

    const getPermissions = this.permissionsController.getPermissions.bind(
      this.permissionsController,
    )

    const createPermission = this.permissionsController.createPermission.bind(
      this.permissionsController,
    )

    const updatePermission = this.permissionsController.updatePermission.bind(
      this.permissionsController,
    )

    const deletePermission = this.permissionsController.deletePermission.bind(
      this.permissionsController,
    )

    this.permissionsRoutes.get('/', getPermission)

    this.permissionsRoutes.get('/:id', getPermissions)

    this.permissionsRoutes.post('/', createPermission)

    this.permissionsRoutes.put('/:id', updatePermission)

    this.permissionsRoutes.delete('/:id', deletePermission)
  }

  get PermissionsRoutes() {
    return this.permissionsRoutes
  }
}
