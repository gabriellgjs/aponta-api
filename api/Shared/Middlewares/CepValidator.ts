import findCEP from "../Services/CEP/FindCEP";
import { BadRequestError } from "../Utils/Error/ApiErrors";

export default async function (cep: string){
  await findCEP.get(`${cep}/json`).then((response) => {
    if(response.data?.erro) throw new BadRequestError("CEP inválido");
  }).catch(() => {
    throw new BadRequestError("CEP inválido");
  });
};