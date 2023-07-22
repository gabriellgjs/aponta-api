import express, { Router } from 'express';
import PatientsController from '../Controllers/PatientsController';

export default class PatientsRoutes {
  private patientsController: PatientsController;
  private patientsRoutes: Router;

  constructor() {
    this.patientsController = new PatientsController();
    this.patientsRoutes = express.Router();
    this.routes();
  }

  public async routes() {
    const createPatient = this.patientsController.createPatient.bind(
      this.patientsController,
    );

    const getPatients = this.patientsController.getPatients.bind(
      this.patientsController,
    );

    const getPatient = this.patientsController.getPatient.bind(
      this.patientsController,
    );

    this.patientsRoutes.post('/', createPatient);

    this.patientsRoutes.get('/', getPatients);
    
    this.patientsRoutes.get('/:id', getPatient);
  }

  get PatientsRoutes() {
    return this.patientsRoutes;
  }
}
