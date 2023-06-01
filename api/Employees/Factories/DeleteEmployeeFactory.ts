import DeleteEmployeeInputData from '@src/Employees/Application/Dtos/DeleteEmployeeInputData';
import { Request } from 'express';

export default class DeleteEmployeeFactory {
  static fromRequest(request: Request) {
    const { id } = request.params;

    return new DeleteEmployeeInputData(Number(id));
  }
}
