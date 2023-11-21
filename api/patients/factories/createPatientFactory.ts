import { Request } from 'express'
import CreatePatientInputData from '@patients/application/dtos/createPatientInputData'

export default class CreatePatientFactory {
  static fromRequest(request: Request) {
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

    return new CreatePatientInputData(
      name,
      birthDate,
      rg,
      cpf,
      gender,
      maritalStatus,
      address,
      telephone,
    )
  }
}
