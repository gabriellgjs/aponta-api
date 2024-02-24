import { InternalServerError } from "@apiErrors/errors"
import findCEP from "./findCEP"


export async function postalCodeIsValid(postalCode: string) {
  try {
    return await findCEP.get(`${postalCode}/json/`, {
        timeout: 3000
    }).then((response) => {
        if(response.data?.erro) {
            return false
        }
        return true;
    }).catch(() =>  false)
  } catch (error) {
    throw new InternalServerError('Erro ao validar cep')
  }
}
