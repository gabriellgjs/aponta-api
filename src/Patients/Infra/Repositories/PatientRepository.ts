import Patient from '../../Domain/Entities/Patient';
import PatientsModel from '../Models/PatientsModel';

export default class UserRepository {
  private patientsModel: PatientsModel;

  constructor() {
    this.patientsModel = new PatientsModel();
  }

  async save(patient: Patient) {
    if (patient.id) {
      //return this.update(role);
    }

    return this.create(patient);
  }

  async create(patient: Patient) {
    try {
      const id = await this.patientsModel.createPatient(patient);

      patient.id = id;

      return patient;
    } catch (error) {}
  }

  /*async update(user: User): Promise<void> {
    await this.patientsModel.updateUser(user);
  }*/

  async delete(patient_id: number): Promise<void> {
    await this.patientsModel.deletePatient(patient_id);
  }
}

//TODO verificar se existe a necessidade de um método save()
