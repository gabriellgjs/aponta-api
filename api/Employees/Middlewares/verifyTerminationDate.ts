import { prismaConnection } from "@prisma/PrismaConnection";
import { BadRequestError } from "api/Shared/Utils/Error/ApiErrors";
import dayjs from "dayjs";

export default async function verifyTerminationDate (termination_date: string  | null, employee_id: number) {
  if(termination_date) {
    const employee = await prismaConnection.employee.findFirst({
      where: { id: employee_id},
      select: {
        people: {
          select: {
            birth_date: true,
          }
        }
      }
    });
    const now = dayjs();
    const termination_date_dateDayjs = dayjs(termination_date);
    const terminationDateIsAfterBirth = termination_date_dateDayjs.isAfter(employee!.people.birth_date);
  
    if (!terminationDateIsAfterBirth) {
      throw new BadRequestError(
        'Data de desligamento não pode ser antes da data de aniversário',
      );
    }
  
    const termination_dateIsBeforeNow = termination_date_dateDayjs.isBefore(now);
  
    if (!termination_dateIsBeforeNow) {
      throw new BadRequestError('Data de desligamento não pode ser maior que hoje');
    }
  }
};