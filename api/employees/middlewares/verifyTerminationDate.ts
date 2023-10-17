export default async function verifyTerminationDate(
  terminationDate: string | null,
  employeeId: number,
) {
  // if (terminationDate) {
  //   const employee = await PrismaConnection.employee.findFirst({
  //     where: { id: employeeId },
  //     select: {
  //       people: {
  //         select: {
  //           birthDate: true,
  //         },
  //       },
  //     },
  //   })
  //   const now = dayjs()
  //   const terminationDateDayjs = dayjs(terminationDate)
  //   const terminationDateIsAfterBirth = terminationDateDayjs.isAfter(
  //     employee?.people.birthDate,
  //   )
  //   if (!terminationDateIsAfterBirth) {
  //     throw new BadRequestError(
  //       'Data de desligamento não pode ser antes da data de aniversário',
  //     )
  //   }
  //   const terminationDateIsBeforeNow = terminationDateDayjs.isBefore(now)
  //   if (!terminationDateIsBeforeNow) {
  //     throw new BadRequestError(
  //       'Data de desligamento não pode ser maior que hoje',
  //     )
  //   }
  // }
}

// TODO mudar validação
