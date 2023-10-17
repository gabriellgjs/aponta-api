import Address from '@employees/domain/entities/address'
import Employee from '@employees/domain/entities/employee'
import Telephone from '@employees/domain/entities/telephone'
import User from '@employees/domain/entities/user'
import EmployeeRepository from '@employees/infra/repositories/employeeRepository'
import CreateEmployeeInputData from '@employees/application/dtos/createEmployeeInputData'

export default class CreateEmployeeAction {
  async execute(input: CreateEmployeeInputData) {
    const employeeRepository = new EmployeeRepository()

    const user = {
      email: input.user.email ?? '',
      password: input.user.password ?? '',
      roleId: input.user.roleId ?? 0,
    }

    const telephoneNumber = {
      telephoneNumber: input.telephone.telephoneNumber,
    }

    const address = {
      street: input.address.state,
      number: input.address.number,
      district: input.address.district,
      city: input.address.city,
      postalCode: input.address.postalCode,
      state: input.address.state,
    }

    const employee =
      input.user.email === null
        ? new Employee({
            name: input.name,
            birthDate: input.birthDate,
            rg: input.rg,
            cpf: input.cpf,
            gender: input.gender,
            maritalStatus: input.maritalStatus,
            telephone: new Telephone(telephoneNumber),
            address: new Address(address),
            hireDate: input.hireDate,
          })
        : new Employee({
            name: input.name,
            birthDate: input.birthDate,
            rg: input.rg,
            cpf: input.cpf,
            gender: input.gender,
            telephone: new Telephone(telephoneNumber),
            address: new Address(address),
            hireDate: input.hireDate,
            user: new User(user),
          })

    return await employeeRepository.save(employee)
  }
}
