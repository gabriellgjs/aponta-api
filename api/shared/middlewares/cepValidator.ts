import { BadRequestError } from '@apiErrors/errors'
import findCEP from '../services/cep/findCEP'

export default async function (cep: string) {
  await findCEP
    .get(`${cep}/json`)
    .then((response: { data: { error: string } }) => {
      if (response.data?.error) throw new BadRequestError('CEP inválido')
    })
    .catch(() => {
      throw new BadRequestError('CEP inválido')
    })
}
