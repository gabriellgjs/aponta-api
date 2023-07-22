import { Request } from 'express';
import { z } from 'zod';
import { PersonSchemaZod } from '../Types/PersonZod';
import GeneratorErrorResponse from '../Utils/Error/Helpers/GeneratorErrorMessages';
import { verifyPersonSchema } from '../Utils/Zod/ZodVerifySchemas';
import { BirthDateValidator } from './BirthDateValidator';
import CepValidator from './CepValidator';
import CpfValidator from './CpfValidator';
import regexName from '../Utils/Regex/RegexName';

const regexRG = /^[a-zA-Z0-9]+$/gm;
const regexTelephone = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/gm;

export default async function personValidatorZod(request: Request) {
  const PersonSchema: PersonSchemaZod = z.object({
    name: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'name',
        ),
      )
      .regex(regexName, 'Nome só pode ter letras e acentuações.'),
    birth_date: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeDateOrRequired(
          'birth_date',
        ),
      )
      .datetime(),
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
        .min(8, 'CPF deve ter 8 caracteres.')
        .max(8, 'CPF deve ter 8 caracteres.'),
      state: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'state',
        ),
      ),
    }),
    telephone: z.object({
      number: z
        .string(
          GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
            'telephone',
          ),
        )
        .regex(regexTelephone, 'Telefone inválido.'),
    }),
    patient: z.object({
      marital_status: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'marital_status',
        ),
      ),
      career: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'career',
        ),
      ),
    })
  });

  const PersonSchemaZodVerify = verifyPersonSchema(PersonSchema, request);

  BirthDateValidator(PersonSchemaZodVerify.data.birth_date);
  CpfValidator(PersonSchemaZodVerify.data.cpf);
  await CepValidator(PersonSchemaZodVerify.data.address.postalCode);
  
  return PersonSchemaZodVerify;
}
