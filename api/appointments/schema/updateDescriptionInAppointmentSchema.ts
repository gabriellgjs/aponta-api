import { z } from 'zod'

export const updateDescriptionInAppointmentSchema = z.object({
  description: z.string({
    required_error: 'Descrição é obrigatório',
    invalid_type_error: 'Descrição deve ser uma string',
  }),
})
