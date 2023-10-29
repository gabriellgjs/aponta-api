import express, { Router } from 'express'
import EmployeesController from '../controllers/employeesController'
import CreateEmployeeMiddleware from '../middlewares/createEmployeeMiddleware'
import { is } from '@sharedAPI/middlewares/accessControlList'
import UpdateEmployeeMiddleware from '../middlewares/updateEmployeeMiddleware'
import StatusEmployeeMiddleware from '../middlewares/statusEmployeeMiddleware'

export default class EmployeesRoutes {
  private employeesController: EmployeesController
  private employeesRoutes: Router

  constructor() {
    this.employeesController = new EmployeesController()
    this.employeesRoutes = express.Router()
    this.routes()
  }

  public async routes() {
    const getEmployee = this.employeesController.getEmployee.bind(
      this.employeesController,
    )

    const getEmployees = this.employeesController.getEmployees.bind(
      this.employeesController,
    )

    const createEmployee = this.employeesController.createEmployee.bind(
      this.employeesController,
    )

    const updateEmployee = this.employeesController.updateEmployee.bind(
      this.employeesController,
    )

    const statusEmployee = this.employeesController.statusEmployee.bind(
      this.employeesController,
    )

    this.employeesRoutes.get('/', getEmployees)
    this.employeesRoutes.get('/:id', getEmployee)
    this.employeesRoutes.post(
      '/',
      is(['admin', 'manager']),
      CreateEmployeeMiddleware,
      createEmployee,
    )
    this.employeesRoutes.put(
      '/:id',
      is(['admin', 'manager']),
      UpdateEmployeeMiddleware,
      updateEmployee,
    )
    this.employeesRoutes.patch(
      '/:id',
      is(['admin', 'manager']),
      StatusEmployeeMiddleware,
      statusEmployee,
    )
  }

  get EmployeesRoutes() {
    return this.employeesRoutes
  }
}
