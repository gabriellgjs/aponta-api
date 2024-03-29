import dayjs from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import es from 'dayjs/locale/es'

dayjs.extend(CustomParseFormat)
dayjs.locale(es)

export default class PatientsOutputData {
  static responseGetPatients(patients: any[]) {
    const response = patients.map((patient) => {
      const id = patient?.id
      const status = patient?.status

      const people = {
        name: patient?.people.name,
        birthDate: dayjs(patient.people.birthDate)
          .set('hours', 24)
          .format('DD/MM/YYYY'),
        rg: patient?.people.rg,
        cpf: patient?.people.cpf,
        gender: patient?.people.gender,
        maritalStatus: patient?.people.maritalStatus,
      }

      const telephone = {
        telephoneNumber: patient?.people.telephone[0].telephoneNumber,
      }

      const address = {
        street: patient?.people.address[0].street,
        number: patient?.people.address[0].number,
        district: patient?.people.address[0].district,
        city: patient?.people.address[0].city,
        postalCode: patient?.people.address[0].postalCode,
        state: patient?.people.address[0].state,
      }

      return {
        id,
        ...people,
        telephone,
        address,
        patient: {
          status,
        },
      }
    })

    return [...response]
  }

  static responseGetPatient(patient: any) {
    const id = patient?.id
    const status = patient?.status

    const people = {
      name: patient?.people.name,
      birthDate: dayjs(patient.people.birthDate)
        .set('hours', 24)
        .format('DD/MM/YYYY'),
      rg: patient?.people.rg,
      cpf: patient?.people.cpf,
      gender: patient?.people.gender,
      maritalStatus: patient?.people.maritalStatus,
    }

    const telephone = {
      telephoneNumber: patient?.people.telephone[0].telephoneNumber,
    }

    const address = {
      street: patient?.people.address[0].street,
      number: patient?.people.address[0].number,
      district: patient?.people.address[0].district,
      city: patient?.people.address[0].city,
      postalCode: patient?.people.address[0].postalCode,
      state: patient?.people.address[0].state,
    }

    return {
      id,
      ...people,
      address,
      telephone,
      patient: {
        status,
      },
    }
  }
}
