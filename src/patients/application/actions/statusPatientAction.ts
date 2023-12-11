import PatientRepository from '@patients/infra/repositories/patientRepository'
import DeletePatientInputData from '../dtos/statusPatientInputData'

export default class StatusPatientAction {
  async execute(input: DeletePatientInputData): Promise<void> {
    const patientRepository = new PatientRepository()

    return await patientRepository.status(input.id)
  }
}
