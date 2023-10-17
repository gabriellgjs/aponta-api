import Telephone from '@employees/domain/entities/telephone'
import Employee from '@employees/domain/entities/employee'
import Patient from '@employees/domain/entities/patient'
import Address from '@employees/domain/entities/address'
import User from '@employees/domain/entities/user'
import EmployeeRepository from '@employees/infra/repositories/employeeRepository'
import UpdateEmployeeInputData from '@employees/application/dtos/updateEmployeeInputData'

export default class UpdateEmployeeAction {
  async execute(
    input: UpdateEmployeeInputData,
    actual: UpdateEmployeeInputData,
  ) {
    const employeeRepository = new EmployeeRepository()

    const employee =
      actual.user.email === null
        ? new Employee({
            id: actual.id,
            maritalStatus: input.maritalStatus ?? actual.maritalStatus,
            status: input.status ?? actual.status,
            hireDate: input.hireDate ?? actual.hireDate,
            terminationDate: input.terminationDate ?? actual.terminationDate,
            peopleId: input.peopleId ?? actual.peopleId,
            name: input.name ?? actual.name,
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
          })
        : new Employee({
            id: actual.id,
            status: input.status ?? actual.status,
            hireDate: input.hireDate ?? actual.hireDate,
            terminationDate: input.terminationDate ?? actual.terminationDate,
            peopleId: input.peopleId ?? actual.peopleId,
            name: input.name ?? actual.name,
            birthDate: input.birthDate ?? actual.birthDate,
            rg: input.rg ?? actual.rg,
            cpf: input.cpf ?? actual.cpf,
            gender: input.gender ?? actual.gender,
            maritalStatus: input.maritalStatus ?? actual.maritalStatus,
            user: new User({
              id: actual.user?.id,
              email: input.user?.email ?? actual.user?.email,
              password: input.user?.password ?? actual.user?.password,
              roleId: input.user?.roleId ?? actual.user?.roleId,
            }),
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
          })

    return await employeeRepository.save(employee)
  }
}
