import { Request, Response } from 'express'
import CreatePatientFactory from '../factories/createPatientFactory'
import PatientsModel from '../models/patientsModel'
import CreatePatientAction from '@patients/application/actions/createPatientAction'
import PatientsOutputData from '../dtos/patientsOutputData'
import { InternalServerError } from '@apiErrors/errors'

export default class PatientsController {
  public async createPatient(request: Request, response: Response) {
    try {
      const patientAction = new CreatePatientAction()

      const patientFactory = CreatePatientFactory.fromRequest(request)

      const patientId = (await patientAction.execute(patientFactory))?.id

      return response.status(201).json(patientId)
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async getPatients(request: Request, response: Response) {
    try {
      const patientsModel = new PatientsModel()

      const patients = await patientsModel.getPatients()

      return response
        .status(200)
        .json(
          PatientsOutputData.responseGetPatients(patients) ??
            'Nenhum paciente encontrado',
        )
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async getPatient(request: Request, response: Response) {
    try {
      const patientsModel = new PatientsModel()

      const { id } = request.params

      const patient = await patientsModel.getPatientById(Number(id))

      return response
        .status(200)
        .json(
          PatientsOutputData.responseGetPatient(patient) ??
            'Nenhum funcionário encontrado',
        )
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }
}
