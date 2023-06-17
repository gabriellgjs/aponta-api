import { BadRequestError } from "api/Shared/Utils/Error/ApiErrors";
import dayjs from "dayjs";

export default function verifyHireDate (hire_date: string, birth_date: string) {
  const now = dayjs();
  const hire_dateDayjs = dayjs(hire_date);
  const hireDateIsAfterBirth = hire_dateDayjs.isAfter(birth_date);

  if (!hireDateIsAfterBirth) {
    throw new BadRequestError(
      'Data de contração não pode ser antes da data de aniversário',
    );
  }

  const hireDateIsBeforeNow = hire_dateDayjs.isBefore(now);

  if (!hireDateIsBeforeNow) {
    throw new BadRequestError('Data de contratação não pode ser no futuro');
  }
};