import { Request } from 'express';
import CreateEmployeeInputData from '@src/Employees/Application/Dtos/CreateEmployeeInputData';

export default class CreateEmployeeFactory {
  static fromRequest(request: Request) {
    const { name } = request.body;
    const { birth_date } = request.body;
    const { rg } = request.body;
    const { cpf } = request.body;
    const { gender } = request.body;
    const { hire_date } = request.body;
    const { pis_pasep } = request.body;

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
    
    const patient = {
      marital_status: request.body.patient.marital_status,
      career: request.body.patient.career,
    };

    return new CreateEmployeeInputData(
      name,
      birth_date,
      rg,
      cpf,
      gender,
      hire_date,
      pis_pasep,
      address,
      telephone,
      patient,
    );
  }
}
