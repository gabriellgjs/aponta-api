import EmployeeRepository from '../../Infra/Repositories/EmployeeRepository';
import SetTerminationDateInputData from '../Dtos/SetTerminationDateInputData';

export default class SetTerminationDateAction {
  async execute(input: SetTerminationDateInputData) {
    const employeeRepository = new EmployeeRepository();

    return await employeeRepository.setTerminationDate(input.employee_id, input.terminationDate);
  }
}
