import Address from '@src/Patients/Domain/Entities/Address';
import Telephone from '@src/Patients/Domain/Entities/Telephone';
import Patient from '@src/Patients/Domain/Entities/Patient';

import PatientRepository from '../../Infra/Repositories/PatientRepository';
import CreatePatientInputData from '../Dtos/CreatePatientInputData';

export default class CreatePatientAction {
  async execute(input: CreatePatientInputData): Promise<Patient | void> {
    const patientRepository = new PatientRepository();

    const number = {
      number: input.telephone.number,
    };

    const address = {
      street: input.address.state,
      number: input.address.number,
      district: input.address.district,
      city: input.address.city,
      postal_code: input.address.postalCode,
      state: input.address.state,
    };

    const patient = new Patient({
      name: input.name,
      birth_date: input.birth_date,
      rg: input.rg,
      cpf: input.cpf,
      gender: input.gender,
      career: input.career,
      marital_status: input.marital_status,
      telephone: new Telephone(number),
      address: new Address(address),
    });

    return await patientRepository.save(patient);
  }
}
