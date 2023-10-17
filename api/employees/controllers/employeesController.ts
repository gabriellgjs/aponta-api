import { Request, Response } from 'express'
import CreateEmployeeAction from '@employees/application/actions/createEmployeeAction'
import CreateEmployeeFactory from '../factories/createEmployeeFactory'
import EmployeesModel from '../models/employeesModel'
import EmployeeOutputData from '../dtos/employeeOutputData'
import DeleteEmployeeAction from '@employees/application/actions/deleteEmployeeAction'
import DeleteEmployeeFactory from '../factories/deleteEmployeeFactory'
import UpdateEmployeeAction from '@employees/application/actions/updateEmployeeAction'
import UpdateEmployeeFactory from '../factories/updateEmployeeFactory'
import SetUserIdAction from '@employees/application/actions/setUserIdAction'
import SetUserIdFactory from '../factories/setUserIdFactory'
import SetTerminationDateAction from '@employees/application/actions/setTerminationDateAction'
import SetTerminationDateFactory from '../factories/setTerminationDateFactory'
import { BadRequestError, InternalServerError } from '@apiErrors/errors'

export default class EmployeesController {
  public async getEmployee(request: Request, response: Response) {
    try {
      const employeesModel = new EmployeesModel()

      const { employeeId } = request.params

      const employee = await employeesModel.getEmployeeById(Number(employeeId))

      if (!employee) {
        throw new BadRequestError('Nenhum funcionário encontrado')
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

  public async deleteEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new DeleteEmployeeAction()

      const userDataInput = DeleteEmployeeFactory.fromRequest(request)
      await employeeAction.execute(userDataInput)
      return response.status(204).json().end()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async setUserId(request: Request, response: Response) {
    try {
      const employeeAction = new SetUserIdAction()

      const userDataInput = SetUserIdFactory.fromRequest(request)

      await employeeAction.execute(userDataInput)

      return response.status(200).end()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async setTerminationDate(request: Request, response: Response) {
    try {
      const employeeAction = new SetTerminationDateAction()

      const userDataInput = SetTerminationDateFactory.fromRequest(request)
      await employeeAction.execute(userDataInput)

      return response.status(200).end()
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }
}
