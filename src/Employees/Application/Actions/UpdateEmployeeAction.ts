import Telephone from '@src/Employees/Domain/Entities/Telephone';
import Employee from '../../Domain/Entities/Employee';
import Patient from '../../Domain/Entities/Patient';
import EmployeeRepository from '../../Infra/Repositories/EmployeeRepository';
import UpdateEmployeeInputData from '../Dtos/UpdateEmployeeInputData';
import Address from '@src/Employees/Domain/Entities/Address';
import User from '@src/Employees/Domain/Entities/User';

export default class UpdateEmployeeAction {
  async execute(
    input: UpdateEmployeeInputData,
    actual: UpdateEmployeeInputData,
  ) {
    const employeeRepository = new EmployeeRepository();

    const employee = actual.user.email === null 
      ? 
        new Employee({
        id: actual.id,
        status: input.status ?? actual.status,
        pis_pasep: input.pis_pasep ?? actual.pis_pasep,
        hire_date: input.hire_date ?? actual.hire_date,
        termination_date: input.termination_date ?? actual.termination_date,
        people_id: input.people_id ?? actual.people_id,
        name: input.name ?? actual.name,
        birth_date: input.birth_date ?? actual.birth_date,
        rg: input.rg ?? actual.rg,
        cpf: input.cpf ?? actual.cpf,
        gender: input.gender ?? actual.gender,
        telephone: new Telephone({
          id: actual.telephone.id,
          number: input.telephone.number,
        }),
        address: new Address({ 
          id: actual.address.id,
          street: input.address.street ?? actual.address.street,
          number: input.address.number ?? actual.address.number,
          district: input.address.district ?? actual.address.district,
          city: input.address.city ?? actual.address.city,
          postal_code: input.address.postal_code ?? actual.address.postal_code,
          state: input.address.state ?? actual.address.state,
        }),
        patient: new Patient({
          id: actual.patient.id,
          career: input.patient.career ?? actual.patient.career,
          marital_status: input.patient.marital_status ?? actual.patient.marital_status,
        }),
        })
      :
      new Employee({
        id: actual.id,
        status: input.status ?? actual.status,
        pis_pasep: input.pis_pasep ?? actual.pis_pasep,
        hire_date: input.hire_date ?? actual.hire_date,
        termination_date: input.termination_date ?? actual.termination_date,
        people_id: input.people_id ?? actual.people_id,
        name: input.name ?? actual.name,
        birth_date: input.birth_date ?? actual.birth_date,
        rg: input.rg ?? actual.rg,
        cpf: input.cpf ?? actual.cpf,
        gender: input.gender ?? actual.gender,
        user: new User({
          id: actual.user!.id,
          email: input.user!.email ?? actual.user!.email,
          password: input.user!.password ?? actual.user!.password,
          role_id: input.user!.role_id ?? actual.user!.role_id,
        }),
        telephone: new Telephone({
          id: actual.telephone.id,
          number: input.telephone.number,
        }),
        address: new Address({ 
          id: actual.address.id,
          street: input.address.street ?? actual.address.street,
          number: input.address.number ?? actual.address.number,
          district: input.address.district ?? actual.address.district,
          city: input.address.city ?? actual.address.city,
          postal_code: input.address.postal_code ?? actual.address.postal_code,
          state: input.address.state ?? actual.address.state,
        }),
        patient: new Patient({
          id: actual.patient.id,
          career: input.patient.career ?? actual.patient.career,
          marital_status: input.patient.marital_status ?? actual.patient.marital_status,
        }),
        })

    return await employeeRepository.save(employee);
  }
}
