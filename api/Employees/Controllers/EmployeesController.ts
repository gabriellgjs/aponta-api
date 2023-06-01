import { Request, Response } from 'express';

import CreateEmployeeAction from '@src/Employees/Application/Actions/CreateEmployeeAction';
import CreateEmployeeFactory from '../Factories/CreateEmployeeFactory';

import EmployeesModel from '../Models/EmployeesModel';
import EmployeeOutputData from '../Dtos/EmployeeOutputData';
import DeleteEmployeeAction from '@src/Employees/Application/Actions/DeleteEmployeeAction';
import DeleteEmployeeFactory from '../Factories/DeleteEmployeeFactory';
import UpdateEmployeeAction from '@src/Employees/Application/Actions/UpdateEmployeeAction';
import UpdateEmployeeFactory from '../Factories/UpdateEmployeeFactory';

export default class EmployeesController {
  public async getEmployee(
    request: Request,
    response: Response,
  ): Promise<Response<string | undefined>> {
    try {
      const employeesModel = new EmployeesModel();

      const { id } = request.params;

      const employee = await employeesModel.getEmployeesById(Number(id));

      return response
        .status(200)
        .send(JSON.stringify(EmployeeOutputData.responseGetEmployee(employee)));
    } catch (error) {
      throw new Error('erro');
    }
  }

  public async getEmployees(request: Request, response: Response) {
    try {
      const employeesModel = new EmployeesModel();

      const employees = await employeesModel.getEmployees();

      return response
        .status(200)
        .send(EmployeeOutputData.responseGetEmployees(employees));
    } catch (error) {
      throw new Error('erro');
    }
  }

  public async createEmployee(request: Request, response: Response) {
    const employeeAction = new CreateEmployeeAction();

    const employeeFactory = CreateEmployeeFactory.fromRequest(request);

    const employeeId = (await employeeAction.execute(employeeFactory)).id;

    return response.status(200).json(employeeId);
  }

  public async updateEmployee(request: Request, response: Response) {
      const employeeAction = new UpdateEmployeeAction();
      const employeesModel = new EmployeesModel();
  
      const userDataInput = UpdateEmployeeFactory.fromRequest(request);
  
      const actualEmployee = await employeesModel.getEmployeesById(userDataInput.id);
    
      const actualEmployeesInput = UpdateEmployeeFactory.fromCurrentRole(actualEmployee);
  
      await employeeAction.execute(userDataInput, actualEmployeesInput);
  
      return response.status(200).json('funfou');
  }

  public async deleteEmployee(request: Request, response: Response) {
    const employeeAction = new DeleteEmployeeAction();

    const userDataInput = DeleteEmployeeFactory.fromRequest(request);

    console.log(userDataInput);

    await employeeAction.execute(userDataInput);

    return response.status(200).json('funfou');
  }
}
