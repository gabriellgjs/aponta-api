import { BadRequestError } from '@apiErrors/errors'
import { ErrorsProps } from '@apiErrors/types/errorsProps'
import { PersonSchemaZod } from '@sharedAPI/types/personZod'
import regexDate from '@sharedAPI/utils/regex/regexDate'
import regexName from '@sharedAPI/utils/regex/regexName'
import regexTelephone from '@sharedAPI/utils/regex/regexTelephone'
import { Request, Response } from 'express'
import { ZodError, string, z } from 'zod'

export default async function personValidatorZod(
  request: Request,
  response: Response,
) {
  const PersonSchema: PersonSchemaZod = z.object({
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
      .regex(regexDate, 'Data inválida'),
    rg: z
      .string({
        required_error: 'RG é obrigatório',
        invalid_type_error: 'RG inválido',
      })
      .trim()
      .min(1, 'RG é obrigatório')
      .max(12, 'RG não pode ter mais de 12 caracteres'),
    cpf: z
      .string({
        invalid_type_error: 'CPF inválido',
        required_error: 'CPF é obrigatório',
      })
      .trim()
      .min(1, 'CPF é obrigatório')
      .max(14, 'CPF não pode ter mais de 14 caracteres'),
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
        .max(9, 'CEP deve ter 8 caracteres'),
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

  const isParseSuccess = PersonSchema.safeParse(request.body)
  try {
    if (isParseSuccess.success) {
      return isParseSuccess
    }

    console.log(isParseSuccess.error.errors.map((error) => error.message))
    const ErrorMessage: ErrorsProps = {
      message: 'true',
      paths: isParseSuccess.error.errors.map((error) => error.path[0]),
      messageByPath: isParseSuccess.error.errors.map((error) => error.message),
    }
    throw new BadRequestError(ErrorMessage)
  } catch (error) {
    if (error instanceof BadRequestError) {
      console.log(error)
      return response
        .status(400)
        .json({
          error: error.message,
          paths: error.paths,
          messages: error.messageByPath,
        })
        .end()
    }
  }
  // if (PersonSchemaZodVerify) {
  //   birthDateValidator(PersonSchemaZodVerify?.data.birthDate)
  //   cpfValidator(PersonSchemaZodVerify.data.cpf)
  //   await cepValidator(PersonSchemaZodVerify.data.address.postalCode)
  // }
}
