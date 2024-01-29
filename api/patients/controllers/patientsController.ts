import { Request, Response } from 'express'
import CreatePatientFactory from '../factories/createPatientFactory'
import PatientsModel from '../models/patientsModel'
import CreatePatientAction from '@patients/application/actions/createPatientAction'
import PatientsOutputData from '../dtos/patientsOutputData'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@apiErrors/errors'
import Sentry from '../../application/sentry'
import StatusPatientAction from '@patients/application/actions/statusPatientAction'
import StatusPatientFactory from '@patientsAPI/factories/statusPatientFactory'
import UpdatePatientAction from '@patients/application/actions/updatePatientAction'
import UpdatePatientFactory from '@patientsAPI/factories/updatePatientFactory'

export default class PatientsController {
  public async createPatient(request: Request, response: Response) {
    try {
      const patientAction = new CreatePatientAction()

      const patientFactory = CreatePatientFactory.fromRequest(request)

      const patientId = (await patientAction.execute(patientFactory))?.id

      return response.status(201).json(patientId).end()
    } catch (error) {
      console.log(error)
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ message: error.message })
          .end()
      }
    }
  }

  public async getPatients(request: Request, response: Response) {
    try {
      const patientsModel = new PatientsModel()

      const patients = await patientsModel.getPatients()

      return response
        .status(200)
        .json(PatientsOutputData.responseGetPatients(patients))
        .end()
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

  public async getPatientsInactive(request: Request, response: Response) {
    try {
      const patientsModel = new PatientsModel()

      const patients = await patientsModel.getPatientsInactive()

      return response
        .status(200)
        .json(PatientsOutputData.responseGetPatients(patients))
        .end()
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

  public async getPatient(request: Request, response: Response) {
    try {
      const patientsModel = new PatientsModel()

      const { id } = request.params

      const patient = await patientsModel.getPatientById(Number(id))

      if (!patient) throw new NotFoundError('Paciente não encontrado')

      return response
        .status(200)
        .json(PatientsOutputData.responseGetPatient(patient))
        .end()
    } catch (error) {
      if (
        error instanceof InternalServerError ||
        error instanceof BadRequestError ||
        error instanceof NotFoundError
      ) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ status: error.statusCode, message: error.message })
          .end()
      }
    }
  }

  public async statusPatient(request: Request, response: Response) {
    try {
      const patientAction = new StatusPatientAction()

      const userDataInput = StatusPatientFactory.fromRequest(request)

      await patientAction.execute(userDataInput)

      return response.status(204).json().end()
    } catch (error) {
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ status: error.statusCode, message: error.message })
          .end()
      }
    }
  }

  public async updatePatient(request: Request, response: Response) {
    try {
      const patientAction = new UpdatePatientAction()
      const patientModel = new PatientsModel()

      const userDataInput = UpdatePatientFactory.fromRequest(request)
      const actualPatient = await patientModel.getPatientById(userDataInput.id)

      if (actualPatient) {
        const actualPatientInput =
          UpdatePatientFactory.fromCurrentPatient(actualPatient)

        await patientAction.execute(userDataInput, actualPatientInput)
        return response.status(204).json().end()
      }
    } catch (error) {
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.message)

        return response
          .status(error.statusCode)
          .json({ status: error.statusCode, message: error.message })
          .end()
      }
    }
  }
}
