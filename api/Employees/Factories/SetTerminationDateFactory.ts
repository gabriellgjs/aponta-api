import SetTerminationDateInputData from '@src/Employees/Application/Dtos/SetTerminationDateInputData';
import dayjs from 'dayjs';
import { Request } from 'express';

export default class SetTerminationDateFactory {
  static fromRequest(request: Request) {
    const { employee_id } = request.params;
    const valueOfRequest = request.query.termination_date === 'null' ? null : dayjs(String(request.query.termination_date)).toDate();
    return new SetTerminationDateInputData(Number(employee_id), valueOfRequest);
  }
}
