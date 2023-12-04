import { z } from 'zod'
import regexName from '@sharedAPI/utils/regex/regexName'

export const roleSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
      invalid_type_error: 'Nome deve ser uma String',
    })
    .regex(regexName, 'Nome só pode ter letras e acentuações')
    .min(3, 'Nome deve ser maior 3 caracteres')
    .trim(),
})
