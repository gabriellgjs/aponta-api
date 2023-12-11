import { Request } from 'express'
import UpdatePatientInputData from '@patients/application/dtos/updatePatientInputData'

export default class UpdatePatientFactory {
  static fromRequest(request: Request) {
    const { id } = request.params
    const { name } = request.body
    const { birthDate } = request.body
    const { rg } = request.body
    const { cpf } = request.body
    const { maritalStatus } = request.body
    const { gender } = request.body

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

    return new UpdatePatientInputData(
      Number(id),
      name,
      birthDate,
      rg,
      cpf,
      maritalStatus,
      gender,
      address,
      telephone,
    )
  }

  static fromCurrentPatient(patient: any) {
    const address = {
      id: patient?.people.address[0].id ?? 0,
      street: patient?.people.address[0].street ?? '',
      number: patient?.people.address[0].number ?? '',
      district: patient?.people.address[0].district ?? '',
      city: patient?.people.address[0].city ?? '',
      postalCode: patient?.people.address[0].postalCode ?? '',
      state: patient?.people.address[0].state ?? '',
    }

    const telephone = {
      id: patient?.people.telephone[0].id ?? 0,
      telephoneNumber: patient?.people.telephone[0].telephoneNumber ?? '',
    }

    return new UpdatePatientInputData(
      Number(patient?.id),
      patient?.people.name ?? '',
      patient?.people?.birthDate ?? new Date(),
      patient?.people.rg ?? '',
      patient?.people.cpf ?? '',
      patient?.people.maritalStatus ?? '',
      patient?.people.gender ?? '',
      address,
      telephone,
    )
  }
}
