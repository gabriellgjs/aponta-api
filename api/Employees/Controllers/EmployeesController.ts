import { Request, Response } from 'express';

import CreateEmployeeAction from '@src/Employees/Application/Actions/CreateEmployeeAction';
import CreateEmployeeFactory from '../Factories/CreateEmployeeFactory';

import EmployeesModel from '../Models/EmployeesModel';
import EmployeeOutputData from '../Dtos/EmployeeOutputData';
import DeleteEmployeeAction from '@src/Employees/Application/Actions/DeleteEmployeeAction';
import DeleteEmployeeFactory from '../Factories/DeleteEmployeeFactory';
import UpdateEmployeeAction from '@src/Employees/Application/Actions/UpdateEmployeeAction';
import UpdateEmployeeFactory from '../Factories/UpdateEmployeeFactory';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';
import SetUserIdAction from '@src/Employees/Application/Actions/SetUserIdAction';
import SetUserIdFactory from '../Factories/SetUserIdFactory';

export default class EmployeesController {
  public async getEmployee(request: Request, response: Response) {
    try {
      const employeesModel = new EmployeesModel();

      const { id } = request.params;

      const employee = await employeesModel.getEmployeeById(Number(id));

      return response
        .status(200)
        .json(
          EmployeeOutputData.responseGetEmployee(employee) ??
            'Nenhum funcionário encontrado',
        );
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }

  public async getEmployees(request: Request, response: Response) {
    try {
      const employeesModel = new EmployeesModel();

      const employees = await employeesModel.getEmployees();

      return response
        .status(200)
        .json(
          EmployeeOutputData.responseGetEmployees(employees) ??
            'Nenhum funcionário encontrado',
        );
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }

  public async createEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new CreateEmployeeAction();

      const employeeFactory = CreateEmployeeFactory.fromRequest(request);

      const employeeId = (await employeeAction.execute(employeeFactory))?.id;

      return response.status(201).json(employeeId);
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }

  public async updateEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new UpdateEmployeeAction();
      const employeesModel = new EmployeesModel();

      const userDataInput = UpdateEmployeeFactory.fromRequest(request);
      const actualEmployee = await employeesModel.getEmployeeById(
        userDataInput.id,
        );
        
        const actualEmployeesInput =
        UpdateEmployeeFactory.fromCurrentRole(actualEmployee);
        
      await employeeAction.execute(userDataInput, actualEmployeesInput);
      return response.status(204).json();
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }

  public async deleteEmployee(request: Request, response: Response) {
    try {
      const employeeAction = new DeleteEmployeeAction();

      const userDataInput = DeleteEmployeeFactory.fromRequest(request);

      await employeeAction.execute(userDataInput);
      return response.status(204).json();
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }

  public async setUserId(request: Request, response: Response) {
    try {
      const employeeAction = new SetUserIdAction();

      const userDataInput = SetUserIdFactory.fromRequest(request);

      const a = await employeeAction.execute(userDataInput);
      
      return response.status(200).end();
    } catch (error) {
      if (error instanceof InternalServerError)
      throw new InternalServerError(error.message);
    }
  }
}
