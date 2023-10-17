import { Request } from 'express'
import { z } from 'zod'
import regexRG from '@sharedAPI/utils/regex/regexRG'
import regexTelephone from '@sharedAPI/utils/regex/regexTelephone'
import { PersonSchemaZod } from '@sharedAPI/types/personZod'
import { verifyPersonSchema } from '@sharedAPI/utils/zod/zodVerifySchemas'
import GeneratorErrorResponse from '@sharedAPI/utils/errors/helpers/generatorErrorMessages'
import regexName from '@sharedAPI/utils/regex/regexName'
import { BirthDateValidator } from './birthDateValidator'
import CepValidator from './cepValidator'
import CpfValidator from './cpfValidator'

export default async function personValidatorZod(request: Request) {
  const PersonSchema: PersonSchemaZod = z.object({
    name: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'name',
        ),
      )
      .regex(regexName, 'Nome só pode ter letras e acentuações.'),
    birthDate: z.string(
      GeneratorErrorResponse.generateErrorMessageInTypeDateOrRequired(
        'birth_date',
      ),
    ),
    rg: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired('rg'),
      )
      .regex(regexRG, 'RG só pode conter números ou letras')
      .max(15, 'RG não pode ter mais de 15 caracteres'),
    cpf: z.string(
      GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired('cpf'),
    ),
    gender: z.string(
      GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
        'gender',
      ),
    ),
    address: z.object({
      street: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'street',
        ),
      ),
      number: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'number',
        ),
      ),
      district: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'district',
        ),
      ),
      city: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'city',
        ),
      ),
      postalCode: z
        .string(
          GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
            'postalCode',
          ),
        )
        .min(8, 'CEP deve ter 8 caracteres.')
        .max(8, 'CEP deve ter 8 caracteres.'),
      state: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'state',
        ),
      ),
    }),
    telephone: z.object({
      telephoneNumber: z
        .string(
          GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
            'telephone',
          ),
        )
        .regex(regexTelephone, 'Telefone inválido.'),
    }),
  })

  const PersonSchemaZodVerify = verifyPersonSchema(PersonSchema, request)

  BirthDateValidator(PersonSchemaZodVerify.data.birthDate)
  CpfValidator(PersonSchemaZodVerify.data.cpf)
  await CepValidator(PersonSchemaZodVerify.data.address.postalCode)

  return PersonSchemaZodVerify
}
