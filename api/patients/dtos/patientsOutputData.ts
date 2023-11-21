import { responseGetPatient, responseGetPatients } from '../types/patientTypes'

export default class PatientsOutputData {
  static responseGetPatients(patients: responseGetPatient[]) {
    const response = patients.map((patient) => {
      const id = patient?.id
      const status = patient?.status

      const people = {
        name: patient?.people.name,
        birthDate: patient?.people.birthDate,
        rg: patient?.people.rg,
        cpf: patient?.people.cpf,
        gender: patient?.people.gender,
        maritalStatus: patient?.people.maritalStatus,
      }

      const telephone = {
        id: patient?.people.telephone[0].id,
        telephoneNumber: patient?.people.telephone[0].telephoneNumber,
      }

      const address = {
        id: patient?.people.address[0].id,
        street: patient?.people.address[0].street,
        number: patient?.people.address[0].number,
        district: patient?.people.address[0].district,
        city: patient?.people.address[0].city,
        postalCode: patient?.people.address[0].postalCode,
        state: patient?.people.address[0].state,
      }

      return {
        id,
        patient: {
          status,
        },
        ...people,
        telephone,
        address,
      }
    })

    return [...response]
  }

  static responseGetPatient(patient: responseGetPatient) {
    const id = patient?.id
    const status = patient?.status

    const people = {
      name: patient?.people.name,
      birthDate: patient?.people.birthDate,
      rg: patient?.people.rg,
      cpf: patient?.people.cpf,
      gender: patient?.people.gender,
      maritalStatus: patient?.people.maritalStatus,
    }

    const telephone = {
      id: patient?.people.telephone[0].id,
      telephoneNumber: patient?.people.telephone[0].telephoneNumber,
    }

    const address = {
      id: patient?.people.address[0].id,
      street: patient?.people.address[0].street,
      number: patient?.people.address[0].number,
      district: patient?.people.address[0].district,
      city: patient?.people.address[0].city,
      postalCode: patient?.people.address[0].postalCode,
      state: patient?.people.address[0].state,
    }

    return {
      id,
      patient: {
        status,
      },
      ...people,
      address,
      telephone,
    }
  }
}
