import { Request, Response } from 'express'
import CreateEmployeeAction from '@employees/application/actions/createEmployeeAction'
import CreateEmployeeFactory from '../factories/createEmployeeFactory'
import EmployeesModel from '../models/employeesModel'
import EmployeeOutputData from '../dtos/employeeOutputData'
import StatusEmployeeAction from '@employees/application/actions/statusEmployeeAction'
import StatusEmployeeFactory from '../factories/statusEmployeeFactory'
import UpdateEmployeeAction from '@employees/application/actions/updateEmployeeAction'
import UpdateEmployeeFactory from '../factories/updateEmployeeFactory'
import { BadRequestError, InternalServerError } from '@apiErrors/errors'

export default class EmployeesController {
  public async getEmployee(request: Request, response: Response) {
    try {
      const employeesModel = new EmployeesModel()

      const { employeeId } = request.params

      console.log(employeeId)

      const employee = await employeesModel.getEmployeeById(Number(employeeId))

      if (!employee) {
        throw new BadRequestError({ message: 'Nenhum funcionário encontrado' })
      }

      return response
        .status(200)
        .json(EmployeeOutputData.responseGetEmployee(employee))
        .end()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async getEmployees(request: Request, response: Response) {
    try {
      const employeesModel = new EmployeesModel()

      const employees = await employeesModel.getEmployees()
      return response
        .status(200)
        .json(EmployeeOutputData.responseGetEmployees(employees))
        .end()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async createEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new CreateEmployeeAction()

      const employeeFactory = CreateEmployeeFactory.fromRequest(request)

      const employeeId = (await employeeAction.execute(employeeFactory))?.id

      return response.status(201).json(employeeId).end()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async updateEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new UpdateEmployeeAction()
      const employeesModel = new EmployeesModel()

      const userDataInput = UpdateEmployeeFactory.fromRequest(request)
      const actualEmployee = await employeesModel.getEmployeeById(
        userDataInput.id,
      )

      const actualEmployeesInput =
        UpdateEmployeeFactory.fromCurrentRole(actualEmployee)

      await employeeAction.execute(userDataInput, actualEmployeesInput)
      return response.status(204).json().end()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async statusEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new StatusEmployeeAction()

      const userDataInput = StatusEmployeeFactory.fromRequest(request)

      await employeeAction.execute(userDataInput)

      return response.status(204).json().end()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }
}
