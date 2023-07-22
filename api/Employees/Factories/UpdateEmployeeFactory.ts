import UpdateEmployeeInputData from '@src/Employees/Application/Dtos/UpdateEmployeeInputData';
import { Request } from 'express';
import { responseGetEmployee } from '../Types/EmployeesTypes';

export default class UpdateEmployeeFactory {
  static fromRequest(request: Request) {
    const { id } = request.params;
    const { status } = request.body;
    const { hire_date } = request.body;
    const { termination_date } = request.body;
    const { pis_pasep } = request.body;
    const { user_id } = request.body;
    const { people_id } = request.body;
    const { name } = request.body;
    const { birth_date } = request.body;
    const { rg } = request.body;
    const { cpf } = request.body;
    const { gender } = request.body;
    const { street } = request.body.address;
    const { address_number } = request.body.address;
    const { district } = request.body.address;
    const { city } = request.body.address;
    const { postal_code } = request.body.address;
    const { state } = request.body.address;
    const telephone_number = request.body.telephone.number;
    const { marital_status } = request.body.patient.marital_status;
    const { career } = request.body.patient;

    return new UpdateEmployeeInputData(
      Number(id),
      status,
      hire_date,
      termination_date,
      pis_pasep,
      user_id,
      people_id,
      name,
      birth_date,
      rg,
      cpf,
      gender,
      {
        street,
        number: address_number,
        district,
        city,
        postal_code,
        state,
      },
      {
        number: telephone_number,
      },
      {
        marital_status,
        career
      }
    );
  }

  static fromCurrentRole(employee: responseGetEmployee) {
    const address_id = employee!.people.address[0].id;
    const street = employee!.people.address[0].street;
    const address_number = employee!.people.address[0].number;
    const district = employee!.people.address[0].district;
    const city = employee!.people.address[0].city;
    const postal_code = employee!.people.address[0].postal_code;
    const state = employee!.people.address[0].state;

    const telephone_id = employee!.people.telephone[0].id;
    const telephone_number = employee!.people.telephone[0].number;
    
    const patient_id = employee!.people.patient[0].id;
    const marital_status = employee!.people.patient[0].marital_status;
    const career = employee!.people.patient[0].career;

    return new UpdateEmployeeInputData(
      employee!.id,
      employee!.status,
      employee!.hire_date,
      employee?.termination_date,
      employee!.pis_pasep,
      employee?.user_id,
      employee!.people_id,
      employee!.people.name,
      employee!.people.birth_date,
      employee!.people.rg,
      employee!.people.cpf,
      employee!.people.gender,
      {
        id: address_id,
        street,
        number: address_number,
        district,
        city,
        postal_code,
        state,
      },
      {
        id: telephone_id,
        number: telephone_number,
      }, 
      {
        id: patient_id,
        marital_status,
        career,
      }     
    );
  }
}
