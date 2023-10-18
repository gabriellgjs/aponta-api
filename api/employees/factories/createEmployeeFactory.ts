import CreateEmployeeInputData from '@employees/application/dtos/createEmployeeInputData'
import { Request } from 'express'

export default class CreateEmployeeFactory {
  static fromRequest(request: Request) {
    const { name } = request.body
    const { birthDate } = request.body
    const { rg } = request.body
    const { cpf } = request.body
    const { gender } = request.body
    const { hireDate } = request.body
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
      telephoneNumber: request.body.telephone.telephoneNumber,
    }

    const user = {
      email: request.body.email,
      roleId: request.body.roleId,
    }

    return new CreateEmployeeInputData(
      name,
      birthDate,
      rg,
      cpf,
      gender,
      maritalStatus,
      hireDate,
      address,
      telephone,
      user,
    )
  }
}
