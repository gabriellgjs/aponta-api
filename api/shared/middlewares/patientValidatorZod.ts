import { Request } from 'express'
import { z } from 'zod'
import GeneratorErrorResponse from '@sharedAPI/utils/errors/helpers/generatorErrorMessages'
import regexName from '@sharedAPI/utils/regex/regexName'
import { verifyEmployeePatientSchema } from '@sharedAPI/utils/zod/zodVerifySchemas'

export default async function patientValidatorZod(request: Request) {
  const PatientSchema = z.object({
    patient: z.object({
      marital_status: z
        .string(
          GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
            'marital_status',
          ),
        )
        .regex(regexName, 'Estado Civil só pode ter letras e acentuações.'),
      career: z
        .string(
          GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
            'career',
          ),
        )
        .regex(regexName, 'Carreira só pode ter letras e acentuações.'),
    }),
  })

  const PatientSchemaZodVerify = verifyEmployeePatientSchema(
    PatientSchema,
    request,
  )

  return PatientSchemaZodVerify
}
