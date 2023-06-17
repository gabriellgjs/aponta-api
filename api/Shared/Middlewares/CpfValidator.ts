import { isCPF } from 'validation-br';
import { BadRequestError } from "../Utils/Error/ApiErrors";

export default function CpfValidator(cpf: string) {
  if(!isCPF(cpf)) throw new BadRequestError("CPF inválido")
}