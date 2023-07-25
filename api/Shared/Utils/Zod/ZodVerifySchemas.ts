import { PersonSchemaZod } from 'api/Shared/Types/PersonZod';
import { Request } from 'express';
import { fromZodError } from 'zod-validation-error';
import { BadRequestError } from '../Error/ApiErrors';
import GeneratorErrorResponse from '../Error/Helpers/GeneratorErrorMessages';
import { EmployeeSchemaZod } from 'api/Shared/Types/EmployeeZod';
import { RoleSchemaZod } from 'api/Shared/Types/RoleZod';
import { DeleteSchemaId } from 'api/Shared/Types/DeleteZod';
import { EmployeePatientZod } from 'api/Shared/Types/EmployeePatientZod';
import { SetUserIdZod } from 'api/Shared/Types/SetUserIdZod';
import { SetTerminationDateZod } from 'api/Shared/Types/SetTerminationDateZod';
import dayjs from 'dayjs';

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

export function verifySetUserIdSchema(
  schema: SetUserIdZod,
  request: Request,
) {
  const parse = {
    employee_id : Number(request.params.employee_id),
    user_id : Number(request.body.user_id),
  }


  const isParseSuccess = schema.safeParse(parse);

  if (isParseSuccess.success) {
    return isParseSuccess;
  }

  const { message } = fromZodError(isParseSuccess.error);
  throw new BadRequestError(
    GeneratorErrorResponse.messageResponseError(message),
  );
}

export function verifySetTerminationDateSchema(
  schema: SetTerminationDateZod,
  request: Request,
) {
  const valueOfRequest = request.query.termination_date === 'null' ? null : dayjs(String(request.query.termination_date)).toISOString();

  const parse = {
    employee_id : Number(request.params.employee_id),
    termination_date : valueOfRequest,
  }
  
  const isParseSuccess = schema.safeParse(parse);

  if (isParseSuccess.success) {
    return isParseSuccess;
  }

  const { message } = fromZodError(isParseSuccess.error);
  throw new BadRequestError(
    GeneratorErrorResponse.messageResponseError(message),
  );
}

export function verifyEmployeePatientSchema(
  schema: EmployeePatientZod,
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
