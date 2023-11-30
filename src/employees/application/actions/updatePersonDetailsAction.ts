import Telephone from '@employees/domain/entities/telephone'
import Employee from '@employees/domain/entities/employee'
import User from '@employees/domain/entities/user'
import Address from '@employees/domain/entities/address'
import EmployeeRepository from '@employees/infra/repositories/employeeRepository'
import UpdatePersonDetailsInputData from '@employees/application/dtos/updatePersonDetailsInputData'

export default class UpdatePersonDetailsAction {
  async execute(
    input: UpdatePersonDetailsInputData,
    actual: UpdatePersonDetailsInputData,
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
        email: '',
        roleId: input.user.roleId ?? actual.user.roleId,
      }),
    })

    return await employeeRepository.updatePersonDetails(employee)
  }
}
