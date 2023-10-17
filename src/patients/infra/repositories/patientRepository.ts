import Patient from '@patients/domain/entities/patient'
import PatientsModel from '../models/patientsModel'

export default class UserRepository {
  private patientsModel: PatientsModel

  constructor() {
    this.patientsModel = new PatientsModel()
  }

  async save(patient: Patient) {
    if (patient.id) {
      // return this.update(role);
    }

    return this.create(patient)
  }

  async create(patient: Patient) {
    try {
      const id = await this.patientsModel.createPatient(patient)

      patient.id = id ?? 0

      return patient
    } catch (error) {}
  }

  /* async update(user: User): Promise<void> {
    await this.patientsModel.updateUser(user);
  } */

  async delete(patientId: number): Promise<void> {
    await this.patientsModel.deletePatient(patientId)
  }
}
