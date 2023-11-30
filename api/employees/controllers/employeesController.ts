import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@apiErrors/errors'
import CreateEmployeeAction from '@employees/application/actions/createEmployeeAction'
import StatusEmployeeAction from '@employees/application/actions/statusEmployeeAction'
import UpdateEmployeeAction from '@employees/application/actions/updateEmployeeAction'
import { Request, Response } from 'express'
import EmployeeOutputData from '../dtos/employeeOutputData'
import CreateEmployeeFactory from '../factories/createEmployeeFactory'
import StatusEmployeeFactory from '../factories/statusEmployeeFactory'
import UpdateEmployeeFactory from '../factories/updateEmployeeFactory'
import EmployeesModel from '../models/employeesModel'
import UpdatePersonDetailsAction from '@employees/application/actions/updatePersonDetailsAction'
import UpdatePersonDetailsFactory from '@employeesAPI/factories/updatePersonDetailsFactory'
import ChangeEmailAction from '@employees/application/actions/changeEmailAction'
import ChangeEmailFactory from '@employeesAPI/factories/changeEmailFactory'
import ChangePasswordAction from '@employees/application/actions/changePasswordAction'
import ChangePasswordFactory from '@employeesAPI/factories/changePasswordFactory'
import Sentry from '../../application/sentry'

export default class EmployeesController {
  public async getEmployee(request: Request, response: Response) {
    try {
      const employeesModel = new EmployeesModel()

      const employeeId = request.params.id

      const employee = await employeesModel.getEmployeeById(Number(employeeId))

      if (!employee) throw new NotFoundError('Usuário não encontrado')

      return response.status(200).json(employee).end()
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

  public async getEmployees(request: Request, response: Response) {
    try {
      const employeesModel = new EmployeesModel()

      const employees = await employeesModel.getEmployees()

      return response.status(200).json(employees).end()
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

  public async createEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new CreateEmployeeAction()

      const employeeFactory = CreateEmployeeFactory.fromRequest(request)

      const employeeId = (await employeeAction.execute(employeeFactory))?.id

      return response.status(201).json(employeeId).end()
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

  public async updateEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new UpdateEmployeeAction()
      const employeesModel = new EmployeesModel()

      const userDataInput = UpdateEmployeeFactory.fromRequest(request)
      const actualEmployee = await employeesModel.getEmployeeById(
        userDataInput.id,
      )

      if (actualEmployee) {
        const actualEmployeesInput =
          UpdateEmployeeFactory.fromCurrentEmployee(actualEmployee)

        await employeeAction.execute(userDataInput, actualEmployeesInput)
        return response.status(204).json().end()
      }
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

  public async statusEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new StatusEmployeeAction()

      const userDataInput = StatusEmployeeFactory.fromRequest(request)

      await employeeAction.execute(userDataInput)

      return response.status(204).json().end()
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

  public async updatePersonDetails(request: Request, response: Response) {
    try {
      const employeeAction = new UpdatePersonDetailsAction()
      const employeesModel = new EmployeesModel()

      const userDataInput = UpdatePersonDetailsFactory.fromRequest(request)

      const actualEmployee = await employeesModel.getEmployeeById(
        userDataInput.id,
      )

      if (actualEmployee) {
        const actualEmployeesInput =
          UpdatePersonDetailsFactory.fromCurrentEmployee(actualEmployee)

        await employeeAction.execute(userDataInput, actualEmployeesInput)

        return response.status(204).json().end()
      }
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

  public async changeEmail(request: Request, response: Response) {
    try {
      const changeEmailAction = new ChangeEmailAction()

      const userDataInput = ChangeEmailFactory.fromRequest(request)

      await changeEmailAction.execute(userDataInput)

      return response.status(204).json().end()
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

  public async changePassword(request: Request, response: Response) {
    try {
      const changePasswordAction = new ChangePasswordAction()

      const userDataInput = ChangePasswordFactory.fromRequest(request)

      await changePasswordAction.execute(userDataInput)

      return response.status(204).json().end()
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
