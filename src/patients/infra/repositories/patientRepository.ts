import Patient from '@patients/domain/entities/patient'
import PatientsModel from '../models/patientsModel'

export default class PatientRepository {
  private patientsModel: PatientsModel

  constructor() {
    this.patientsModel = new PatientsModel()
  }

  async save(patient: Patient) {
    if (patient.id) {
      return this.update(patient)
    }
    return this.create(patient)
  }

  async create(patient: Patient) {
    const id = await this.patientsModel.createPatient(patient)

    patient.id = id ?? 0

    return patient
  }

  async update(patient: Patient): Promise<void> {
    await this.patientsModel.updatePatient(patient)
  }

  async status(patientId: number): Promise<void> {
    await this.patientsModel.statusPatient(patientId)
  }
}
