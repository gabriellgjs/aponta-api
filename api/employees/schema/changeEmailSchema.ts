import { z } from 'zod'

export const changeEmailSchema = z.object({
  email: z
    .string({
      required_error: 'Email é obrigatório',
      invalid_type_error: 'Email inválido',
    })
    .email('Email inválido'),
})
