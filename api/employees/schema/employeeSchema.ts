import { z } from 'zod'
import dayjs from 'dayjs'
import pluginSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import pluginSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(pluginSameOrBefore)
dayjs.extend(pluginSameOrAfter)

export const employeeSchema = z
  .object({
    hireDate: z
      .string({
        required_error: 'Data de admissão é obrigatória',
        invalid_type_error: 'Data de admissão inválida',
      })
      .min(1, 'Data de admissão é obrigatória')
      .refine((value) => !dayjs(value).isSameOrAfter(dayjs()), {
        message: 'Data de contratação não pode ser maior que hoje',
      }),
    user: z
      .object({
        email: z
          .string({
            required_error: 'Email é obrigatório',
            invalid_type_error: 'Email inválido',
          })
          .email('Email inválido'),
        password: z.string({
          required_error: 'Senha é obrigatória',
          invalid_type_error: 'Senha inválida',
        }).optional(),
        roleId: z.number(),
      })
      .optional(),
    birthDate: z
      .string({
        required_error: 'Data de nascimento é obrigatória',
        invalid_type_error: 'Data de nascimento inválida',
      })
      .min(1, 'Data de nascimento é obrigatória'),
  })
  .superRefine(({ birthDate, hireDate }, ctx) => {
    if (!dayjs(birthDate).isSameOrBefore(dayjs(hireDate))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Data de contratação não pode ser antes da data de nascimento',
      })
    }
  })
