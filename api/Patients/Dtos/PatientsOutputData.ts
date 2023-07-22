import { responseGetPatient, responseGetPatients } from "../Types/PatientTypes";

export default class PatientsOutputData {
  static responseGetPatients(patients: responseGetPatients) {
    const response = patients.map((patient) => {
      const id = patient.id;
      const name = patient.people.name;
      return {
        id,
        name,
        url: `${process.env.BASE_URL}/patients/${id}`,
      };
    });

    return {
      results: response,
    };
  }
  
  static responseGetPatient(patient: responseGetPatient) {
    const people_id = patient?.people.id;
    const name = patient?.people.name;
    const birth_date = patient?.people.birth_date;
    const rg = patient?.people.rg;
    const cpf = patient?.people.cpf;
    const gender = patient?.people.gender;

    const address_id = patient?.people.address[0].id;
    const street = patient?.people.address[0].street;
    const district = patient?.people.address[0].district;
    const city = patient?.people.address[0].city;
    const postal_code = patient?.people.address[0].postal_code;
    const state = patient?.people.address[0].state;

    const telephone_id = patient?.people.telephone[0].id;
    const number = patient?.people.telephone[0].number;

    const patient_id = patient?.id;
    const patient_status = patient?.status;
    const marital_status = patient?.marital_status;
    const career = patient?.career;

    return {
      patient: {
        id: patient_id,
        status: patient_status,
        people: {
          id: people_id,
          name,
          birth_date,
          rg,
          cpf,
          gender,
          marital_status,
          career,
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
        }
      },
    };
  }
}