import PatientRepository from '../../Infra/Repositories/PatientRepository';
import DeletePatientInputData from '../Dtos/DeletePatientInputData';

export default class DeletePatientAction {
  async execute(input: DeletePatientInputData): Promise<void> {
    const patientRepository = new PatientRepository();

    return await patientRepository.delete(input.id);
  }
}
