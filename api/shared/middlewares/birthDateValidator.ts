import { BadRequestError } from '@apiErrors/errors'
import dayjs from 'dayjs'

export function BirthDateValidator(birthDate: string) {
  const now = dayjs()
  const birthDayjs = dayjs(birthDate)
  const birthdayDateIsInTheFuture = birthDayjs.isBefore(now)

  if (!birthdayDateIsInTheFuture) {
    throw new BadRequestError('Data de nascimento não pode ser no futuro')
  }
}
