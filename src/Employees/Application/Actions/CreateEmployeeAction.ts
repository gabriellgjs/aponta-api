import Address from '@src/Employees/Domain/Entities/Address';
import Telephone from '@src/Employees/Domain/Entities/Telephone';
import Employee from '../../Domain/Entities/Employee';
import EmployeeRepository from '../../Infra/Repositories/EmployeeRepository';
import CreateEmployeeInputData from '../Dtos/CreateEmployeeInputData';

export default class CreateEmployeeAction {
  async execute(input: CreateEmployeeInputData): Promise<Employee> {
    const employeeRepository = new EmployeeRepository();

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

    const employee = new Employee({
      name: input.name,
      birth_date: input.birth_date,
      rg: input.rg,
      cpf: input.cpf,
      gender: input.gender,
      role_id: input.role_id,
      pis_pasep: input.pis_pasep,
      telephone: new Telephone(number),
      address: new Address(address),
      user_id: input.role_id,
      hire_date: input.hire_date,
    });

    return await employeeRepository.create(employee);
  }
}
