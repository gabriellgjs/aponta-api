import express, { Router } from 'express'
import EmployeesController from '../controllers/employeesController'
import CreateEmployeeMiddleware from '../middlewares/createEmployeeMiddleware'
import UpdateEmployeeMiddleware from '../middlewares/updateEmployeeMiddleware'
import ChangeEmailMiddleware from '@employeesAPI/middlewares/changeEmailMiddleware'
import ChangePasswordMiddleware from '@employeesAPI/middlewares/changePasswordMiddleware'
import StatusEmployeeMiddleware from '@employeesAPI/middlewares/statusEmployeeMiddleware'
import UpdateEmployeePersonDetailsMiddleware from '@employeesAPI/middlewares/updateEmployeePersonDetailsMiddleware'

export default class EmployeesRoutes {
  private readonly employeesController: EmployeesController
  private readonly employeesRoutes: Router

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

    const getEMployeesInactive =
      this.employeesController.getEmployeesInactive.bind(
        this.employeesController,
      )

    const createEmployee = this.employeesController.createEmployee.bind(
      this.employeesController,
    )

    const updateEmployee = this.employeesController.updateEmployee.bind(
      this.employeesController,
    )

    const updatePersonDetails =
      this.employeesController.updatePersonDetails.bind(
        this.employeesController,
      )

    const statusEmployee = this.employeesController.statusEmployee.bind(
      this.employeesController,
    )

    const changeEmail = this.employeesController.changeEmail.bind(
      this.employeesController,
    )

    const changePassword = this.employeesController.changePassword.bind(
      this.employeesController,
    )

    this.employeesRoutes.get('/', getEmployees)
    this.employeesRoutes.get('/inactive', getEMployeesInactive)
    this.employeesRoutes.get('/:id', getEmployee)
    this.employeesRoutes.put('/email/:id', ChangeEmailMiddleware, changeEmail)
    this.employeesRoutes.put(
      '/password/:id',
      ChangePasswordMiddleware,
      changePassword,
    )
    this.employeesRoutes.post('/', CreateEmployeeMiddleware, createEmployee)
    this.employeesRoutes.put('/:id', UpdateEmployeeMiddleware, updateEmployee)
    this.employeesRoutes.put(
      '/person-details/:id',
      UpdateEmployeePersonDetailsMiddleware,
      updatePersonDetails,
    )
    this.employeesRoutes.patch('/:id', StatusEmployeeMiddleware, statusEmployee)
  }

  get EmployeesRoutes() {
    return this.employeesRoutes
  }
}
