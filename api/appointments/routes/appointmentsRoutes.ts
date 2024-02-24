import express, { Router } from 'express'
import AppointmentController from '@appointmentsAPI/controllers/appointmentController'
import CreateAppointmentMiddleware from '@appointmentsAPI/middlewares/createAppointmentMiddleware'
import CancelAppointmentMiddleware from '@appointmentsAPI/middlewares/cancelAppointmentMiddleware'
import RescheduleAppointmentMiddleware from '@appointmentsAPI/middlewares/rescheduleAppointmentMiddleware'
import DeleteAppointmentMiddleware from '@appointmentsAPI/middlewares/deleteAppointmentMiddleware'
import updatePatientInAppointment from '@appointmentsAPI/middlewares/updatePatientInAppointment'
import updateDescriptionInAppointmentMiddleware from '@appointmentsAPI/middlewares/updateDescriptionMiddleware'

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

    const getAppointmentById =
      this.appointmentController.getAppointmentById.bind(
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

    const getAppointmentRescheduleByDay =
      this.appointmentController.getAppointmentRescheduleByDay.bind(
        this.appointmentController,
      )

    const updateAppointment =
      this.appointmentController.updatePatientInAppointment.bind(
        this.appointmentController,
      )

    const updateDescriptionInAppointment = this.appointmentController.updateDescriptionInAppointment.bind(
      this.appointmentController,
      )

    this.appointmentsRoutes.post(
      '/',
      CreateAppointmentMiddleware,
      createAppointment,
    )

    this.appointmentsRoutes.post(
      '/reschedule/:id',
      RescheduleAppointmentMiddleware,
      rescheduleAppointment,
    )

    this.appointmentsRoutes.get('/', getAppointmentActivesByDay)

    this.appointmentsRoutes.put(
      '/:id',
      updatePatientInAppointment,
      updateAppointment,
    )

    this.appointmentsRoutes.get('/cancel/', getAppointmentCanceledByDay)

    this.appointmentsRoutes.get('/reschedule/', getAppointmentRescheduleByDay)
    
    this.appointmentsRoutes.get('/:id', getAppointmentById)

    this.appointmentsRoutes.delete(
      '/:id',
      DeleteAppointmentMiddleware,
      deleteAppointment,
    )

    this.appointmentsRoutes.patch(
      '/cancel/:id',
      CancelAppointmentMiddleware,
      cancelAppointment,
    )

    this.appointmentsRoutes.put(
      '/description/:id', 
      updateDescriptionInAppointmentMiddleware, 
      updateDescriptionInAppointment
    )
  }

  get AppointmentsRoutes() {
    return this.appointmentsRoutes
  }
}
