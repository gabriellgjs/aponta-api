import Telephone from '@employees/domain/entities/telephone'
import Employee from '@employees/domain/entities/employee'
import User from '@employees/domain/entities/user'
import Address from '@employees/domain/entities/address'
import EmployeeRepository from '@employees/infra/repositories/employeeRepository'
import UpdateEmployeeInputData from '@employees/application/dtos/updateEmployeeInputData'

export default class UpdateEmployeeAction {
  async execute(
    input: UpdateEmployeeInputData,
    actual: UpdateEmployeeInputData,
  ) {
    const employeeRepository = new EmployeeRepository()

    const employee = new Employee({
      id: actual.id,
      name: input.name ?? actual.name,
      maritalStatus: input.maritalStatus ?? actual.maritalStatus,
      hireDate: input.hireDate ?? actual.hireDate,
      birthDate: input.birthDate ?? actual.birthDate,
      rg: input.rg ?? actual.rg,
      cpf: input.cpf ?? actual.cpf,
      gender: input.gender ?? actual.gender,
      telephone: new Telephone({
        id: actual.telephone.id,
        telephoneNumber: input.telephone.telephoneNumber,
      }),
      address: new Address({
        id: actual.address.id,
        street: input.address.street ?? actual.address.street,
        number: input.address.number ?? actual.address.number,
        district: input.address.district ?? actual.address.district,
        city: input.address.city ?? actual.address.city,
        postalCode: input.address.postalCode ?? actual.address.postalCode,
        state: input.address.state ?? actual.address.state,
      }),
      user: new User({
        id: actual.user.id,
        email: input.user.email ?? actual.user.email,
        roleId: input.user.roleId ?? actual.user.roleId,
      }),
    })

    console.log(employee.address)

    return await employeeRepository.save(employee)
  }
}
