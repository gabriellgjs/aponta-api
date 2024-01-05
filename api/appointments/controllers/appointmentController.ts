import { Request, Response } from 'express'
import { InternalServerError } from '@apiErrors/errors'
import Sentry from '../../application/sentry'
import CreateAppointmentAction from '@appointments/apllication/actions/createAppointmentAction'
import CreateAppointmentFactory from '@appointmentsAPI/factories/createAppointmentFactory'
import AppointmentsModel from '@appointmentsAPI/models/appointmentsModel'
import DeleteAppointmentAction from '@appointments/apllication/actions/deleteAppointmentAction'
import DeleteAppointmentFactory from '@appointmentsAPI/factories/deleteAppointmentFactory'
import CancelAppointmentFactory from '@appointmentsAPI/factories/cancelAppointmentFactory'
import CancelAppointmentAction from '@appointments/apllication/actions/cancelAppointmentAction'
import RescheduleAppointmentAction from '@appointments/apllication/actions/rescheduleAppointmentAction'
import RescheduleAppointmentFactory from '@appointmentsAPI/factories/rescheduleAppointmentFactory'

export default class AppointmentController {
  public async createAppointment(request: Request, response: Response) {
    try {
      const createAppointmentAction = new CreateAppointmentAction()

      const appointmentFactory = CreateAppointmentFactory.fromRequest(request)

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

  public async rescheduleAppointment(request: Request, response: Response) {
    try {
      const rescheduleAppointmentAction = new RescheduleAppointmentAction()

      const appointmentFactory =
        RescheduleAppointmentFactory.fromRequest(request)

      const appointmentId =
        await rescheduleAppointmentAction.execute(appointmentFactory)

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

  public async getAppointmentActivesByDay(
    request: Request,
    response: Response,
  ) {
    try {
      const appointmentsModel = new AppointmentsModel()

      const queryDay = request.query.day ? String(request.query.day) : ''
      const queryDentistId = request.query.dentistId
        ? Number(request.query.dentistId)
        : 0

      const appointments = await appointmentsModel.getAppointmentsActivesByDay(
        queryDay,
        queryDentistId,
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

  public async getAppointmentCanceledByDay(
    request: Request,
    response: Response,
  ) {
    try {
      const appointmentsModel = new AppointmentsModel()

      const queryDay = request.query.day ? String(request.query.day) : ''
      const queryDentistId = request.query.dentistId
        ? Number(request.query.dentistId)
        : 0

      const appointments = await appointmentsModel.getAppointmentsCanceledByDay(
        queryDay,
        queryDentistId,
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

  public async getAppointmentRescheduleByDay(
    request: Request,
    response: Response,
  ) {
    try {
      const appointmentsModel = new AppointmentsModel()

      const queryDay = request.query.day ? String(request.query.day) : ''
      const queryDentistId = request.query.dentistId
        ? Number(request.query.dentistId)
        : 0

      const appointments =
        await appointmentsModel.getAppointmentsRescheduleByDay(
          queryDay,
          queryDentistId,
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

  public async deleteAppointmentById(request: Request, response: Response) {
    try {
      const appointmentDeleteAction = new DeleteAppointmentAction()

      const data = DeleteAppointmentFactory.fromRequest(request)

      await appointmentDeleteAction.execute(data)

      return response.status(204).json()
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

  public async cancelAppointmentById(request: Request, response: Response) {
    try {
      const appointmentCancelAction = new CancelAppointmentAction()

      const data = CancelAppointmentFactory.fromRequest(request)

      console.log(data)
      await appointmentCancelAction.execute(data)

      return response.status(204).json()
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
