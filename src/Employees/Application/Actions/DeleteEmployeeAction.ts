import EmployeeRepository from '../../Infra/Repositories/EmployeeRepository';
import DeleteEmployeeInputData from '../Dtos/DeleteEmployeeInputData';

export default class DeleteEmployeeAction {
  async execute(input: DeleteEmployeeInputData): Promise<void> {
    const employeeRepository = new EmployeeRepository();

    return await employeeRepository.delete(input.id);
  }
}
