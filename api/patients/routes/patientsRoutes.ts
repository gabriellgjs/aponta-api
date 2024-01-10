import express, { Router } from 'express'
import PatientsController from '../controllers/patientsController'
import CreatePatientMiddleware from '@patientsAPI/middlewares/createPatientMiddleware'
import StatusPatientMiddleware from '@patientsAPI/middlewares/statusPatientMiddleware'
import UpdatePatientMiddleware from '@patientsAPI/middlewares/updatePatientMiddleware'

export default class PatientsRoutes {
  private readonly patientsController: PatientsController
  private readonly patientsRoutes: Router

  constructor() {
    this.patientsController = new PatientsController()
    this.patientsRoutes = express.Router()
    this.routes()
  }

  public async routes() {
    const createPatient = this.patientsController.createPatient.bind(
      this.patientsController,
    )

    const getPatients = this.patientsController.getPatients.bind(
      this.patientsController,
    )

    const getPatientsInactive =
      this.patientsController.getPatientsInactive.bind(this.patientsController)

    const getPatient = this.patientsController.getPatient.bind(
      this.patientsController,
    )

    const statusPatient = this.patientsController.statusPatient.bind(
      this.patientsController,
    )

    const updatePatient = this.patientsController.updatePatient.bind(
      this.patientsController,
    )

    this.patientsRoutes.post('/', CreatePatientMiddleware, createPatient)

    this.patientsRoutes.get('/', getPatients)

    this.patientsRoutes.get('/inactive', getPatientsInactive)

    this.patientsRoutes.get('/:id', getPatient)

    this.patientsRoutes.patch('/:id', StatusPatientMiddleware, statusPatient)

    this.patientsRoutes.put('/:id', UpdatePatientMiddleware, updatePatient)
  }

  get PatientsRoutes() {
    return this.patientsRoutes
  }
}
