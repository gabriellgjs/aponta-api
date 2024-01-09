import { z } from 'zod'
import regexName from '@sharedAPI/utils/regex/regexName'
import regexTelephone from '@sharedAPI/utils/regex/regexTelephone'
import pluginCustomParse from 'dayjs/plugin/customParseFormat'
import pluginIsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjs from 'dayjs'
import { isCPF } from 'validation-br'

dayjs.extend(pluginCustomParse)
dayjs.extend(pluginIsSameOrAfter)

export const personSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
      invalid_type_error: 'Nome inválido',
    })
    .trim()
    .min(1, 'Nome é obrigatório')
    .regex(regexName, 'name só pode conter letras'),
  birthDate: z
    .string({
      required_error: 'Data de nascimento é obrigatória',
      invalid_type_error: 'Data de nascimento inválida',
    })
    .min(1, 'Data de nascimento é obrigatória')
    .refine((value) => dayjs(value, 'YYYY-MM-DD', true).isValid(), {
      message: 'Data de nascimento inválida',
    })
    .refine((value) => !dayjs(value).isSameOrAfter(dayjs()), {
      message: 'Data de nascimento não pode ser maior que hoje',
    }),
  rg: z
    .string({
      required_error: 'RG é obrigatório',
      invalid_type_error: 'RG inválido',
    })
    .trim()
    .min(1, 'RG é obrigatório')
    .max(15, 'RG não pode ter mais de 15 caracteres'),
  cpf: z
    .string({
      invalid_type_error: 'CPF inválido',
      required_error: 'CPF é obrigatório',
    })
    .trim()
    .min(1, 'CPF é obrigatório')
    .max(14, 'CPF não pode ter mais de 14 caracteres')
    .refine((value) => isCPF(value), {
      message: 'CPF inválido',
    }),
  gender: z.string({
    invalid_type_error: 'Gênero inválido',
    required_error: 'Gênero é obrigatório',
  }),
  maritalStatus: z.string({
    invalid_type_error: 'Estado civil inválido',
    required_error: 'Estado civil é obrigatório',
  }),
  address: z.object({
    street: z.string({
      invalid_type_error: 'Rua inválida',
      required_error: 'Rua é obrigatório',
    }),
    number: z.string({
      invalid_type_error: 'Número inválido',
      required_error: 'Número é obrigatório',
    }),
    district: z.string({
      invalid_type_error: 'Bairro inválido',
      required_error: 'Bairro é obrigatório',
    }),
    city: z.string({
      invalid_type_error: 'Cidade inválido',
      required_error: 'Cidade é obrigatório',
    }),
    postalCode: z
      .string({
        invalid_type_error: 'CEP inválido',
        required_error: 'CEP é obrigatório',
      })
      .min(1, 'CEP é obrigatório')
      .max(9, 'CEP deve ter 9 caracteres'),
    state: z.string({
      invalid_type_error: 'Estado inválido',
      required_error: 'Estado é obrigatório',
    }),
  }),
  telephone: z.object({
    telephoneNumber: z
      .string({
        invalid_type_error: 'Telefone inválido',
        required_error: 'Telefone é obrigatório',
      })
      .regex(regexTelephone, 'Telefone inválido'),
  }),
})
