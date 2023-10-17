import UpdateEmployeeInputData from '@employees/application/dtos/updateEmployeeInputData'
import { Request } from 'express'
import { responseGetEmployee } from '../types/employeesTypes'

export default class UpdateEmployeeFactory {
  static fromRequest(request: Request) {
    const { employeeId } = request.params
    const { status } = request.body
    const { hireDate } = request.body
    const { terminationDate } = request.body
    const { userId } = request.body
    const { peopleId } = request.body
    const { name } = request.body
    const { birthDate } = request.body
    const { rg } = request.body
    const { cpf } = request.body
    const { gender } = request.body
    const { maritalStatus } = request.body

    const address = {
      street: request.body.address.street,
      number: request.body.address.number,
      district: request.body.address.district,
      city: request.body.address.city,
      postalCode: request.body.address.postalCode,
      state: request.body.address.state,
    }

    const telephone = {
      telephoneNumber: request.body.telephone.number,
    }

    const user = {
      email: request.body.user.email,
      password: request.body.user.password,
      roleId: request.body.user.roleId,
    }

    return new UpdateEmployeeInputData(
      Number(employeeId),
      status,
      hireDate,
      terminationDate,
      userId,
      peopleId,
      name,
      birthDate,
      rg,
      cpf,
      gender,
      maritalStatus,
      address,
      telephone,
      user,
    )
  }

  static fromCurrentRole(employee: responseGetEmployee) {
    const address = {
      id: employee?.people.address[0].id ?? 0,
      street: employee?.people.address[0].street ?? '',
      number: employee?.people.address[0].number ?? '',
      district: employee?.people.address[0].district ?? '',
      city: employee?.people.address[0].city ?? '',
      postalCode: employee?.people.address[0].postalCode ?? '',
      state: employee?.people.address[0].state ?? '',
    }

    const telephone = {
      id: employee?.people.telephone[0].id ?? 0,
      telephoneNumber: employee?.people.telephone[0].telephoneNumber ?? '',
    }

    return new UpdateEmployeeInputData(
      Number(employee?.id),
      employee?.status ?? '',
      employee?.hireDate ?? '',
      employee?.terminationDate ?? '',
      employee?.userId ?? 0,
      employee?.people?.maritalStatus ?? '',
      employee?.peopleId ?? 0,
      employee?.people.name ?? '',
      employee?.people.birthDate ?? '',
      employee?.people.rg ?? '',
      employee?.people.cpf ?? '',
      employee?.people.gender ?? '',
      address,
      telephone,
    )
  }
}
