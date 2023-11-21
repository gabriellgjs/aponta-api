import UpdateEmployeeInputData from '@employees/application/dtos/updateEmployeeInputData'
import { Request } from 'express'
import { responseGetEmployee } from '../types/employeesTypes'

export default class UpdateEmployeeFactory {
  static fromRequest(request: Request) {
    const { id } = request.params
    const { name } = request.body
    const { birthDate } = request.body
    const { rg } = request.body
    const { cpf } = request.body
    const { maritalStatus } = request.body
    const { gender } = request.body
    const { hireDate } = request.body

    const address = {
      street: request.body.address.street,
      number: request.body.address.number,
      district: request.body.address.district,
      city: request.body.address.city,
      postalCode: request.body.address.postalCode,
      state: request.body.address.state,
    }

    const telephone = {
      telephoneNumber: request.body.telephone.telephoneNumber,
    }

    const user = {
      id: request.body.user.id,
      email: request.body.user.email,
      roleId: request.body.user.roleId,
    }

    return new UpdateEmployeeInputData(
      Number(id),
      name,
      birthDate,
      rg,
      cpf,
      maritalStatus,
      gender,
      hireDate,
      address,
      telephone,
      user,
    )
  }

  static fromCurrentEmployee(employee: responseGetEmployee) {
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
    const user = {
      id: employee?.user[0].id ?? 0,
      email: employee?.people.telephone[0].telephoneNumber ?? '',
      roleId: employee?.user[0].roleId ?? 0,
    }

    return new UpdateEmployeeInputData(
      Number(employee?.id),
      employee?.hireDate ?? '',
      employee?.people?.maritalStatus ?? '',
      employee?.people.name ?? '',
      employee?.people.birthDate ?? '',
      employee?.people.rg ?? '',
      employee?.people.cpf ?? '',
      employee?.people.gender ?? '',
      address,
      telephone,
      user,
    )
  }
}
