import Telephone from '@employees/domain/entities/telephone'
import User from '@employees/domain/entities/user'
import Address from '@employees/domain/entities/address'
import UpdatePatientInputData from '@patients/application/dtos/updatePatientInputData'
import PatientRepository from '@patients/infra/repositories/patientRepository'
import Patient from '@patients/domain/entities/patient'
import dayjs from 'dayjs'

export default class UpdatePatientAction {
  async execute(input: UpdatePatientInputData, actual: UpdatePatientInputData) {
    const patientRepository = new PatientRepository()

    const patient = new Patient({
      id: actual.id,
      name: input.name ?? actual.name,
      maritalStatus: input.maritalStatus ?? actual.maritalStatus,
      birthDate:
        dayjs(input.birthDate).toDate() ?? dayjs(actual.birthDate).toDate(),
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

    return await patientRepository.save(patient)
  }
}
