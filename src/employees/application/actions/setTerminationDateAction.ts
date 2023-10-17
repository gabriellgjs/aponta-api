import EmployeeRepository from '@employees/infra/repositories/employeeRepository'
import SetTerminationDateInputData from '@employees/application/dtos/setTerminationDateInputData'

export default class SetTerminationDateAction {
  async execute(input: SetTerminationDateInputData) {
    const employeeRepository = new EmployeeRepository()

    return await employeeRepository.setTerminationDate(
      input.employeeId,
      input.terminationDate,
    )
  }
}
