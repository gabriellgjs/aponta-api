import { ErrorTypes } from '../model/ErrorType'
import { PrismaConnectionException } from '../infra/prismaConnectionException'
import { UnauthorizedException } from '../infra/unauthorizedException'

export class ControllerHandleException {
  static handlerError(error: ErrorTypes, message?: string) {
    switch (error) {
      case ErrorTypes.InternalServerError:
        break
      case ErrorTypes.BadRequestError:
        return new UnauthorizedException(
          error.toString(),
          message,
        ).sendToSentry()
      case ErrorTypes.UnauthorizedError:
        break
      case ErrorTypes.NotFoundError:
        break
      case ErrorTypes.ServiceUnavailable:
        return new PrismaConnectionException(
          error.toString(),
          'Serviço não disponível por enquanto. Por favor tente novamente mais tarde.',
        ).sendToSentry()
    }
  }
}
