import express, { Router } from 'express'
import EmployeesController from '../controllers/employeesController'
import CreateEmployeeMiddleware from '../middlewares/createEmployeeMiddleware'
import { is } from '@sharedAPI/middlewares/accessControlList'
import SetUserIdMiddleware from '../middlewares/setUserIdMiddleware'
import UpdateEmployeeMiddleware from '../middlewares/updateEmployeeMiddleware'
import DeleteEmployeeMiddleware from '../middlewares/deleteEmployeeMiddleware'
import SetTerminationDateMiddleware from '../middlewares/setTerminationDateMiddleware'

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

    const deleteEmployee = this.employeesController.deleteEmployee.bind(
      this.employeesController,
    )
    const setUserId = this.employeesController.setUserId.bind(
      this.employeesController,
    )

    const setTerminationDate = this.employeesController.setTerminationDate.bind(
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
    this.employeesRoutes.delete(
      '/:id',
      is(['admin', 'manager']),
      DeleteEmployeeMiddleware,
      deleteEmployee,
    )
    this.employeesRoutes.patch(
      '/:employee_id/user',
      is(['admin', 'manager']),
      SetUserIdMiddleware,
      setUserId,
    )
    this.employeesRoutes.patch(
      '/:employee_id',
      is(['admin', 'manager']),
      SetTerminationDateMiddleware,
      setTerminationDate,
    )
  }

  get EmployeesRoutes() {
    return this.employeesRoutes
  }
}
