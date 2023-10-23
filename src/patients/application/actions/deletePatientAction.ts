import PatientRepository from '@patients/infra/repositories/patientRepository'
import DeletePatientInputData from '../dtos/deletePatientInputData'

export default class DeletePatientAction {
  async execute(input: DeletePatientInputData): Promise<void> {
    const patientRepository = new PatientRepository()

    return await patientRepository.delete(input.id)
  }
}
