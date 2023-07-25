import DeleteEmployeeInputData from '@src/Employees/Application/Dtos/SetUserIdInputData';
import { Request } from 'express';

export default class SetUserIdFactory {
  static fromRequest(request: Request) {
    const { employee_id } = request.params;
    const { user_id } = request.body;

    return new DeleteEmployeeInputData(Number(employee_id), Number(user_id));
  }
}
