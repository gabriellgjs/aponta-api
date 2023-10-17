import EmployeeRepository from '@employees/infra/repositories/employeeRepository'
import DeleteEmployeeInputData from '@employees/application/dtos/deleteEmployeeInputData'

export default class DeleteEmployeeAction {
  async execute(input: DeleteEmployeeInputData): Promise<void> {
    const employeeRepository = new EmployeeRepository()

    return await employeeRepository.delete(input.id)
  }
}
