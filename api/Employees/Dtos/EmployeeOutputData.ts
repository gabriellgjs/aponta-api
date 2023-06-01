import dotenv from 'dotenv';
import {
  responseGetEmployee,
  responseGetEmployees,
} from '../Types/EmployeesTypes';

dotenv.config();

export default class EmployeeOutputData {
  static responseGetEmployee(employee: responseGetEmployee) {
    const people_id = employee?.people.id;
    const name = employee?.people.name;
    const birth_date = employee?.people.birth_date;
    const rg = employee?.people.rg;
    const cpf = employee?.people.cpf;
    const gender = employee?.people.gender;

    const address_id = employee?.people.address[0].id;
    const street = employee?.people.address[0].street;
    const district = employee?.people.address[0].district;
    const city = employee?.people.address[0].city;
    const postal_code = employee?.people.address[0].postal_code;
    const state = employee?.people.address[0].state;

    const employee_id = employee?.id;
    const status = employee?.status;
    const hire_date = employee?.hire_date;
    const termination_date = employee?.termination_date;
    const pis_pasep = employee?.pis_pasep;
    const role_id = employee?.role_id;

    const telephone_id = employee?.people.telephone[0].id;
    const number = employee?.people.telephone[0].number;

    const user_id = employee?.user_id;

    return {
      employee: {
        id: employee_id,
        status,
        hire_date,
        termination_date,
        pis_pasep,
        role_id,
        user_id,
        people: {
          id: people_id,
          name,
          birth_date,
          rg,
          cpf,
          gender,
        },
        address: {
          id: address_id,
          street,
          district,
          city,
          postal_code,
          state,
        },
        telephone: {
          id: telephone_id,
          number,
        },
      },
    };
  }

  static responseGetEmployees(employees: responseGetEmployees) {
    const response = employees.map((employee) => {
      const id = employee.id;
      const name = employee.people.name;
      return {
        id,
        name,
        url: `${process.env.BASE_URL}/employee/${id}`,
      };
    });

    return {
      results: response,
    };
  }
}

//TODO tratar datas
