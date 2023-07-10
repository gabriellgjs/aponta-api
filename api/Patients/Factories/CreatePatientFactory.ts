import { Request } from 'express';
import CreatePatientInputData from '@src/Patients/Application/Dtos/CreatePatientInputData';

export default class CreatePatientFactory {
  static fromRequest(request: Request) {
    const { name } = request.body;
    const { birth_date } = request.body;
    const { rg } = request.body;
    const { cpf } = request.body;
    const { gender } = request.body;
    const { marital_status } = request.body;
    const { career } = request.body;

    const address = {
      street: request.body.address.street,
      number: request.body.address.number,
      district: request.body.address.district,
      city: request.body.address.city,
      postalCode: request.body.address.postalCode,
      state: request.body.address.state,
    };

    const telephone = {
      number: request.body.telephone.number,
    };

    return new CreatePatientInputData(
      name,
      birth_date,
      rg,
      cpf,
      gender,
      marital_status,
      career,
      address,
      telephone,
    );
  }
}
