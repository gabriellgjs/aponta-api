import { BadRequestError } from "api/Shared/Utils/Error/ApiErrors";

export default function VerifyId(id: string | number) {
  if(!(Number(id) > 0)) throw new BadRequestError("Id inválido");
}