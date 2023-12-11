import { Request } from 'express'
import UpdatePersonDetailsInputData from '@employees/application/dtos/updatePersonDetailsInputData'

export default class UpdatePersonDetailsFactory {
  static fromRequest(request: Request) {
    const employeeId = request.params.id
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

    return new UpdatePersonDetailsInputData(
      Number(employeeId),
      name,
      birthDate,
      rg,
      cpf,
      maritalStatus,
      gender,
      hireDate,
      address,
      telephone,
    )
  }

  static fromCurrentEmployee(employee: any) {
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

    return new UpdatePersonDetailsInputData(
      Number(employee?.id),
      employee?.people.name ?? '',
      employee?.people?.birthDate ?? new Date(),
      employee?.people.name ?? '',
      employee?.people.cpf ?? '',
      employee?.people.rg ?? '',
      employee?.people.gender ?? '',
      employee?.hireDate ?? new Date(),
      address,
      telephone,
    )
  }
}
