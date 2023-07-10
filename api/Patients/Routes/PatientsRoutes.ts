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
    const createPatient = this.patientsController.createEmployee.bind(
      this.patientsController,
    );

    this.patientsRoutes.post('/', createPatient);
  }

  get PatientsRoutes() {
    return this.patientsRoutes;
  }
}
