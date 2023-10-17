import EmployeeRepository from '@employees/infra/repositories/employeeRepository'
import SetUserIdInputData from '@employees/application/dtos/setUserIdInputData'

export default class SetUserIdAction {
  async execute(input: SetUserIdInputData) {
    const employeeRepository = new EmployeeRepository()

    return await employeeRepository.setUserId(input.employeeId, input.userId)
  }
}
