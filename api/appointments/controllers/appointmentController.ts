import { Request, Response } from 'express'
import { InternalServerError } from '@apiErrors/errors'
import Sentry from '../../application/sentry'
import CreateAppointmentAction from '@appointments/apllication/actions/CreateAppointmentAction'
import CreateAppointmentFactory from '@appointmentsAPI/factories/createAppointmentFactory'
import AppointmentsModel from '@appointmentsAPI/models/AppointmentsModel'

export default class AppointmentController {
  public async createAppointment(request: Request, response: Response) {
    try {
      const createAppointmentAction = new CreateAppointmentAction()

      const appointmentFactory = CreateAppointmentFactory.fromRequest(request)
      // console.log(appointmentFactory)
      const appointmentId = (
        await createAppointmentAction.execute(appointmentFactory)
      )?.id

      return response.status(201).json(appointmentId)
    } catch (error) {
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
      }
    }
  }

  public async getAppointmentByDay(request: Request, response: Response) {
    try {
      const appointmentsModel = new AppointmentsModel()

      const query = request.query.day

      const appointments = await appointmentsModel.getAppointmentsByDay(
        String(query),
      )

      return response.status(200).json(appointments)
    } catch (error) {
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
      }
    }
  }
}
