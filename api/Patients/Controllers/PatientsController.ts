import { Request, Response } from 'express';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

import CreatePatientFactory from '../Factories/CreatePatientFactory';
import EmployeesModel from '../Models/PatientsModel';
import CreatePatientAction from '@src/Patients/Application/Actions/CreatePatientAction';

export default class PatientsController {
  public async createEmployee(request: Request, response: Response) {
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

}
