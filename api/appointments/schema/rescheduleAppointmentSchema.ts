import { z } from 'zod'
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjs from 'dayjs'

dayjs.extend(IsSameOrAfter)

export const rescheduleAppointmentSchema = z
  .object({
    dataTimeStart: z
      .string({
        required_error: 'Data e hora de início é obrigatório',
        invalid_type_error: 'Data e hora de início deve ser uma String',
      })
      .datetime('Formato incorreto da data de início')
      .refine((value) => dayjs(value).isSameOrAfter(dayjs(), 'day'), {
        message: 'Data e hora de início tem que ser igual ou maior que hoje',
      }),
    dataTimeEnd: z
      .string({
        required_error: 'Data e hora de término é obrigatório',
        invalid_type_error: 'Data e hora de término deve ser uma String',
      })
      .datetime('Formato incorreto da data de término'),
  })
  .superRefine(({ dataTimeStart, dataTimeEnd }, ctx) => {
    if (!dayjs(dataTimeEnd).isAfter(dayjs(dataTimeStart))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Data e hora de término tem que ser depois da data e hora de início',
      })
    }
  })
