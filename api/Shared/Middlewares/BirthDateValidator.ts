import dayjs from "dayjs";
import { BadRequestError } from "../Utils/Error/ApiErrors";

export function BirthDateValidator (birth_date: string) {
  const now = dayjs();
  const birth_dateDayjs = dayjs(birth_date);
  const birthdayDateIsInTheFuture = birth_dateDayjs.isBefore(now);

  if (!birthdayDateIsInTheFuture) {
    throw new BadRequestError('Data de nascimento não pode ser no futuro');
  }
};