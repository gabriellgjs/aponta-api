import {
  responseGetEmployee,
  responseGetEmployees,
} from '../types/employeesTypes'

export default class EmployeeOutputData {
  static responseGetEmployee(employee: responseGetEmployee) {
    const peopleId = employee?.people.id
    const name = employee?.people.name
    const birthDate = employee?.people.birthDate
    const rg = employee?.people.rg
    const cpf = employee?.people.cpf
    const gender = employee?.people.gender
    const role = employee?.user[0].role.description

    const email = employee?.user[0].email
    const addressId = employee?.people.address[0].id
    const street = employee?.people.address[0].street
    const district = employee?.people.address[0].district
    const number = employee?.people.address[0].number
    const city = employee?.people.address[0].city
    const postalCode = employee?.people.address[0].postalCode
    const state = employee?.people.address[0].state

    const employeeId = employee?.id
    const hireDate = employee?.hireDate

    const telephoneId = employee?.people.telephone[0].id
    const telephoneNumber = employee?.people.telephone[0].telephoneNumber

    const maritalStatus = employee?.people.maritalStatus

    return {
      id: employeeId,
      hireDate,
      peopleId,
      name,
      email,
      role,
      birthDate,
      rg,
      cpf,
      gender,
      maritalStatus,
      address: {
        id: addressId,
        street,
        number,
        district,
        city,
        postalCode,
        state,
      },
      telephone: {
        id: telephoneId,
        telephoneNumber,
      },
    }
  }

  static responseGetEmployees(employees: responseGetEmployees) {
    const response = employees.map((employee) => {
      const id = employee.id
      const status = employee.user[0].status
      const name = employee.people.name
      const telephone = employee.people.telephone[0].telephoneNumber
      return {
        id,
        status,
        name,
        telephone,
      }
    })

    return {
      response,
    }
  }
}

// TODO tratar datas
