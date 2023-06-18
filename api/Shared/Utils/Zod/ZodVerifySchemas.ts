import { PersonSchemaZod } from 'api/Shared/Types/PersonZod';
import { Request } from 'express';
import { fromZodError } from 'zod-validation-error';
import { BadRequestError } from '../Error/ApiErrors';
import GeneratorErrorResponse from '../Error/Helpers/GeneratorErrorMessages';
import { EmployeeSchemaZod } from 'api/Shared/Types/EmployeeZod';
import { RoleSchemaZod } from 'api/Shared/Types/RoleZod';
import { DeleteSchemaId } from 'api/Shared/Types/DeleteZod';

export function verifyPersonSchema(schema: PersonSchemaZod, request: Request) {
  const isParseSuccess = schema.safeParse(request.body);

  if (isParseSuccess.success) {
    return isParseSuccess;
  }

  const { message } = fromZodError(isParseSuccess.error);
  throw new BadRequestError(
    GeneratorErrorResponse.messageResponseError(message),
  );
}

export function verifyRoleSchema(schema: RoleSchemaZod, request: Request) {
  const isParseSuccess = schema.safeParse(request.body);

  if (isParseSuccess.success) {
    return isParseSuccess;
  }

  const { message } = fromZodError(isParseSuccess.error);
  throw new BadRequestError(
    GeneratorErrorResponse.messageResponseError(message),
  );
}

export function verifyDeleteSchema(schema: DeleteSchemaId, request: Request) {
  const isParseSuccess = schema.safeParse(request.params.id);

  if (isParseSuccess.success) {
    return isParseSuccess;
  }

  const { message } = fromZodError(isParseSuccess.error);
  throw new BadRequestError(
    GeneratorErrorResponse.messageResponseError(message),
  );
}

export function verifyEmployeeSchema(
  schema: EmployeeSchemaZod,
  request: Request,
) {
  const isParseSuccess = schema.safeParse(request.body);

  if (isParseSuccess.success) {
    return isParseSuccess;
  }

  const { message } = fromZodError(isParseSuccess.error);
  throw new BadRequestError(
    GeneratorErrorResponse.messageResponseError(message),
  );
}
