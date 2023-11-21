import { responseGetEmployee } from '../types/employeesTypes'

export default class EmployeeOutputData {
  static responseGetEmployee(employee: responseGetEmployee) {
    const id = employee.id

    const user = {
      id: employee.user[0].id,
      status: employee.user[0].status,
      email: employee.user[0].email,
      roleId: employee.user[0].roleId,
      role: {
        description: employee?.user[0].role.description,
      },
    }

    const people = {
      name: employee.people.name,
      birthDate: employee.people.birthDate,
      rg: employee.people.rg,
      cpf: employee.people.cpf,
      gender: employee.people.gender,
      maritalStatus: employee.people.maritalStatus,
      hireDate: employee.hireDate,
    }

    const telephone = {
      id: employee.people.telephone[0].id,
      telephoneNumber: employee.people.telephone[0].telephoneNumber,
    }

    const address = {
      id: employee.people.address[0].id,
      street: employee.people.address[0].street,
      number: employee.people.address[0].number,
      district: employee.people.address[0].district,
      city: employee.people.address[0].city,
      postalCode: employee.people.address[0].postalCode,
      state: employee.people.address[0].state,
    }

    return { id, ...people, user, telephone, address }
  }

  static responseGetEmployees(employees: responseGetEmployee[]) {
    const response = employees.map((employee) => {
      const id = employee.id

      const user = {
        id: employee.user[0].id,
        status: employee.user[0].status,
        email: employee.user[0].email,
        roleId: employee.user[0].roleId,
        role: {
          description: employee?.user[0].role.description,
        },
      }

      const people = {
        name: employee.people.name,
        birthDate: employee.people.birthDate,
        rg: employee.people.rg,
        cpf: employee.people.cpf,
        gender: employee.people.gender,
        maritalStatus: employee.people.maritalStatus,
        hireDate: employee.hireDate,
      }

      const telephone = {
        id: employee.people.telephone[0].id,
        telephoneNumber: employee.people.telephone[0].telephoneNumber,
      }

      const address = {
        id: employee.people.address[0].id,
        street: employee.people.address[0].street,
        number: employee.people.address[0].number,
        district: employee.people.address[0].district,
        city: employee.people.address[0].city,
        postalCode: employee.people.address[0].postalCode,
        state: employee.people.address[0].state,
      }

      return {
        id,
        ...people,
        user,
        telephone,
        address,
      }
    })

    return [...response]
  }
}
