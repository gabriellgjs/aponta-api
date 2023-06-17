import { BadRequestError } from "api/Shared/Utils/Error/ApiErrors";
import { isPIS } from 'validation-br';

export default function verifyPisPasep(pis_pasep: string) {
  if(!isPIS(pis_pasep)) throw new BadRequestError("Pis/PASEP inválido")
}