import { Request, Response } from 'express';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

import CreatePatientFactory from '../Factories/CreatePatientFactory';
import PatientsModel from '../Models/PatientsModel';
import CreatePatientAction from '@src/Patients/Application/Actions/CreatePatientAction';
import PatientsOutputData from '../Dtos/PatientsOutputData';

export default class PatientsController {
  public async createPatient(request: Request, response: Response) {
    try {
      const patientAction = new CreatePatientAction();

      const patientFactory = CreatePatientFactory.fromRequest(request);

      const patientId = (await patientAction.execute(patientFactory))?.id;

      return response.status(201).json(patientId);
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }

  public async getPatients(request: Request, response: Response) {
    try {
      const patientsModel = new PatientsModel();

      const patients = await patientsModel.getPatients();

      return response
        .status(200)
        .json(
          PatientsOutputData.responseGetPatients(patients) ??
            'Nenhum paciente encontrado',
        );
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }

  public async getPatient(request: Request, response: Response) {
    try {
      const patientsModel = new PatientsModel();

      const { id } = request.params;

      const patient = await patientsModel.getPatientById(Number(id));

      return response
        .status(200)
        .json(
          PatientsOutputData.responseGetPatient(patient) ??
            'Nenhum funcionário encontrado',
        );
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }
}
