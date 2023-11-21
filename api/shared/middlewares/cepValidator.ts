import findCEP from '../services/cep/findCEP'
import { Response } from 'express'
import Sentry from '../../application/sentry'
import { BadRequestError } from '@apiErrors/errors'

export default async function (cep: string, response: Response) {
  try {
    await findCEP
      .get(`${cep}/json`)
      .then((response: { data: { error: string } }) => {
        if (response.data?.error) {
          throw new BadRequestError('CEP inválido')
        }
      })
      .catch(() => {
        throw new BadRequestError('CEP inválido')
      })
  } catch (error) {
    if (error instanceof BadRequestError) {
      await Sentry.sendError(error.nameError, error.message)

      return response
        .status(error.statusCode)
        .json({ message: error.message })
        .end()
    }
  }
}
