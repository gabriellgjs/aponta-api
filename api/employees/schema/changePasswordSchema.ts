import { z } from 'zod'

export const changePasswordSchema = z.object({
  currentPassword: z.string({
    required_error: 'Senha atual é obrigatório',
    invalid_type_error: 'Senha atual inválida',
  }),
  newPassword: z
    .string({
      required_error: 'Nova senha é obrigatória',
      invalid_type_error: 'Nova senha inválida',
    })
    .min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
})
