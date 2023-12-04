import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email é obrigatório',
      invalid_type_error: 'Email deve ser uma String',
    })
    .trim()
    .email('Email inválido'),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
      invalid_type_error: 'Senha deve ser uma String',
    })
    .trim(),
})
