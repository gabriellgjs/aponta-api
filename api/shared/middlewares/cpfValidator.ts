import { BadRequestError } from '@apiErrors/errors'
import { isCPF } from 'validation-br'

export default function CpfValidator(cpf: string) {
  if (!isCPF(cpf)) throw new BadRequestError('CPF inválido')
}
// TODO SEM USO
