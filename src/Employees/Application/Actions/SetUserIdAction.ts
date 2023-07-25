import EmployeeRepository from '../../Infra/Repositories/EmployeeRepository';
import SetUserIdInputData from '../Dtos/SetUserIdInputData';

export default class SetUserIdAction {
  async execute(input: SetUserIdInputData) {
    const employeeRepository = new EmployeeRepository();

    return await employeeRepository.setUserId(input.employee_id, input.user_id);
  }
}
