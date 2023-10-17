import { responseGetPatient, responseGetPatients } from '../types/patientTypes'

export default class PatientsOutputData {
  static responseGetPatients(patients: responseGetPatients) {
    const response = patients.map((patient) => {
      const id = patient.id
      const name = patient.people.name
      return {
        id,
        name,
        url: `${process.env.BASE_URL}/patients/${id}`,
      }
    })

    return {
      results: response,
    }
  }

  static responseGetPatient(patient: responseGetPatient) {
    const peopleId = patient?.people.id
    const name = patient?.people.name
    const birthDate = patient?.people.birthDate
    const rg = patient?.people.rg
    const cpf = patient?.people.cpf
    const gender = patient?.people.gender

    const addressId = patient?.people.address[0].id
    const street = patient?.people.address[0].street
    const district = patient?.people.address[0].district
    const city = patient?.people.address[0].city
    const postalCode = patient?.people.address[0].postalCode
    const state = patient?.people.address[0].state

    const telephoneId = patient?.people.telephone[0].id
    const telephoneNumber = patient?.people.telephone[0].telephoneNumber

    const patientId = patient?.id
    const patientStatus = patient?.status
    const maritalStatus = patient?.people.maritalStatus
    const career = patient?.career

    return {
      patient: {
        id: patientId,
        status: patientStatus,
        people: {
          id: peopleId,
          name,
          birthDate,
          rg,
          cpf,
          gender,
          maritalStatus,
          career,
        },
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
}
