import EmployeeRepository from '@employees/infra/repositories/employeeRepository'
import StatusEmployeeInputData from '@employees/application/dtos/statusEmployeeInputData'

export default class StatusEmployeeAction {
  async execute(input: StatusEmployeeInputData): Promise<void> {
    const employeeRepository = new EmployeeRepository()

    return await employeeRepository.status(input.id)
  }
}
