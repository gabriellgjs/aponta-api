import Address from '@patients/domain/entities/address'
import Telephone from '@patients/domain/entities/telephone'
import Patient from '@patients/domain/entities/patient'
import PatientRepository from '@patients/infra/repositories/patientRepository'
import CreatePatientInputData from '../dtos/createPatientInputData'
import dayjs from 'dayjs'

export default class CreatePatientAction {
  async execute(input: CreatePatientInputData): Promise<Patient | void> {
    const patientRepository = new PatientRepository()

    const number = {
      telephoneNumber: input.telephone.telephoneNumber,
    }

    const address = {
      street: input.address.state,
      number: input.address.number,
      district: input.address.district,
      city: input.address.city,
      postalCode: input.address.postalCode,
      state: input.address.state,
    }

    const patient = new Patient({
      name: input.name,
      birthDate: dayjs(input.birthDate).toDate(),
      rg: input.rg,
      cpf: input.cpf,
      gender: input.gender,
      maritalStatus: input.maritalStatus,
      telephone: new Telephone(number),
      address: new Address(address),
    })

    return await patientRepository.save(patient)
  }
}
