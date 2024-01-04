import express, { Router } from 'express'
import AppointmentController from '@appointmentsAPI/controllers/appointmentController'
import CreateAppointmentMiddleware from '@appointmentsAPI/middlewares/createAppointmentMiddleware'
import DeleteAndCancelMiddleware from '@appointmentsAPI/middlewares/deleteAndCancelMiddleware'

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

    const rescheduleAppointment =
      this.appointmentController.rescheduleAppointment.bind(
        this.appointmentController,
      )

    const deleteAppointment =
      this.appointmentController.deleteAppointmentById.bind(
        this.appointmentController,
      )

    const cancelAppointment =
      this.appointmentController.cancelAppointmentById.bind(
        this.appointmentController,
      )

    const getAppointmentActivesByDay =
      this.appointmentController.getAppointmentActivesByDay.bind(
        this.appointmentController,
      )

    const getAppointmentCanceledByDay =
      this.appointmentController.getAppointmentCanceledByDay.bind(
        this.appointmentController,
      )

    this.appointmentsRoutes.post(
      '/',
      CreateAppointmentMiddleware,
      createAppointment,
    )

    this.appointmentsRoutes.post('/reschedule/:id', rescheduleAppointment)

    this.appointmentsRoutes.get('/', getAppointmentActivesByDay)

    this.appointmentsRoutes.get('/canceled/', getAppointmentCanceledByDay)

    this.appointmentsRoutes.delete(
      '/:id',
      DeleteAndCancelMiddleware,
      deleteAppointment,
    )

    this.appointmentsRoutes.patch(
      '/:id',
      DeleteAndCancelMiddleware,
      cancelAppointment,
    )
  }

  get AppointmentsRoutes() {
    return this.appointmentsRoutes
  }
}
