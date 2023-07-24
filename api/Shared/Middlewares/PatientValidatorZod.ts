import { Request } from 'express';
import { z } from 'zod';
import GeneratorErrorResponse from '../Utils/Error/Helpers/GeneratorErrorMessages';
import regexName from '../Utils/Regex/RegexName';
import { verifyEmployeePatientSchema } from '../Utils/Zod/ZodVerifySchemas';

export default async function patientValidatorZod(request: Request) {
  const PatientSchema= z.object({
    marital_status: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'marital_status',
        ),
      )
      .regex(regexName, 'Estado Civil só pode ter letras e acentuações.'),
    careerg: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired('career'),
      )
      .regex(regexName, 'Carreira só pode ter letras e acentuações.'),
    });

  const PatientSchemaZodVerify = verifyEmployeePatientSchema(PatientSchema, request);
  
  return PatientSchemaZodVerify;
}
