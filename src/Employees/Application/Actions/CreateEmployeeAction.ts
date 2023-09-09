import Address from '@src/Employees/Domain/Entities/Address';
import Telephone from '@src/Employees/Domain/Entities/Telephone';
import Employee from '../../Domain/Entities/Employee';
import EmployeeRepository from '../../Infra/Repositories/EmployeeRepository';
import CreateEmployeeInputData from '../Dtos/CreateEmployeeInputData';
import Patient from '@src/Employees/Domain/Entities/Patient';
import User from '@src/Employees/Domain/Entities/User';

export default class CreateEmployeeAction {
  async execute(input: CreateEmployeeInputData) {
    const employeeRepository = new EmployeeRepository();

    const user = {
      email: input.user.email ?? "",
      password: input.user.password ?? "",
      role_id: input.user.role_id ?? 0,
    }

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

    const patient = {
      marital_status: input.patient.marital_status,
      career: input.patient.career,
    }

    const employee = input.user.email === null 
      ? 
      new Employee({
        name: input.name,
        birth_date: input.birth_date,
        rg: input.rg,
        cpf: input.cpf,
        gender: input.gender,
        pis_pasep: input.pis_pasep,
        telephone: new Telephone(number),
        address: new Address(address),
        hire_date: input.hire_date,
        patient: new Patient(patient),
      })
      : new Employee({
      name: input.name,
      birth_date: input.birth_date,
      rg: input.rg,
      cpf: input.cpf,
      gender: input.gender,
      pis_pasep: input.pis_pasep,
      telephone: new Telephone(number),
      address: new Address(address),
      hire_date: input.hire_date,
      patient: new Patient(patient),
      user: new User(user),
    });

    return await employeeRepository.save(employee);
  }
}
