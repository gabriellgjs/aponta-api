import { BadRequestError } from '@apiErrors/errors'

export default function VerifyId(id: string | number) {
  if (!(Number(id) > 0)) throw new BadRequestError('Id inválido')
}
