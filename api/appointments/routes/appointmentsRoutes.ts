import express, { Router } from 'express'
import AppointmentController from '@appointmentsAPI/controllers/appointmentController'

export default class AppointmentsRoutes {
  private readonly appointmentController: AppointmentController
  private readonly appointmentsRoutes: Router

  constructor() {
    this.appointmentController = new AppointmentController()
    this.appointmentsRoutes = express.Router()
    this.routes()
  }

  public async routes() {
    const createAppointment = this.appointmentController.createAppointment.bind(
      this.appointmentController,
    )

    const getAppointmentByDay =
      this.appointmentController.getAppointmentByDay.bind(
        this.appointmentController,
      )

    this.appointmentsRoutes.post('/', createAppointment)
    this.appointmentsRoutes.get('/', getAppointmentByDay)
  }

  get AppointmentsRoutes() {
    return this.appointmentsRoutes
  }
}
