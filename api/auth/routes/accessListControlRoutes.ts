import express, { Router } from 'express'
import ACLRolePermissionsController from '../controllers/ACLRolePermissionsController'
import ACLUserPermissionsController from '../controllers/ACLUserPermissionsController'

export default class AccessListControlRoutes {
  private readonly ACLRolePermissionsController: ACLRolePermissionsController
  private readonly ACLUserPermissionsController: ACLUserPermissionsController
  private readonly ACLRoutes: Router

  constructor() {
    this.ACLRoutes = express.Router()
    this.ACLRolePermissionsController = new ACLRolePermissionsController()
    this.ACLUserPermissionsController = new ACLUserPermissionsController()
    this.routes()
  }

  public async routes() {
    const createRolePermissions =
      this.ACLRolePermissionsController.createRolePermissions.bind(
        this.ACLRolePermissionsController,
      )
    const createUserPermissions =
      this.ACLUserPermissionsController.createUserPermissions.bind(
        this.ACLUserPermissionsController,
      )

    this.ACLRoutes.post('/role/:role_id', createRolePermissions)
    this.ACLRoutes.post('/user/:user_id', createUserPermissions)
  }

  get ACLRoute() {
    return this.ACLRoutes
  }
}
