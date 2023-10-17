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

    const addressId = employee?.people.address[0].id
    const street = employee?.people.address[0].street
    const district = employee?.people.address[0].district
    const city = employee?.people.address[0].city
    const postalCode = employee?.people.address[0].postalCode
    const state = employee?.people.address[0].state

    const employeeId = employee?.id
    const status = employee?.status
    const hireDate = employee?.hireDate
    const terminationDate = employee?.terminationDate

    const telephoneId = employee?.people.telephone[0].id
    const telephoneNumber = employee?.people.telephone[0].telephoneNumber

    const userId = employee?.userId

    const maritalStatus = employee?.people.maritalStatus

    return {
      employee: {
        id: employeeId,
        status,
        hireDate,
        terminationDate,
        userId,
        peopleId,
        name,
        birthDate,
        rg,
        cpf,
        gender,
        maritalStatus,
        address: {
          id: addressId,
          street,
          district,
          city,
          postalCode,
          state,
        },
        telephone: {
          id: telephoneId,
          telephoneNumber,
        },
      },
    }
  }

  static responseGetEmployees(employees: responseGetEmployees) {
    const response = employees.map((employee) => {
      const id = employee.id
      const name = employee.people.name
      const telephone = employee.people.telephone[0].telephoneNumber
      return {
        id,
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
