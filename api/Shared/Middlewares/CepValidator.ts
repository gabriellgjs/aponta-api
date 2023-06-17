import findCEP from "../Services/CEP/FindCEP";
import { BadRequestError } from "../Utils/Error/ApiErrors";

export default async function (cep: string){
  await findCEP.get(`${cep}/json`).catch(() => {
    throw new BadRequestError("CEP inválido");
  });
};