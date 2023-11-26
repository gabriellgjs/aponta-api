import PrismaConnection from '@prisma/prismaConnection'
import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { BadRequestError } from '@apiErrors/errors'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import { ControllerHandleException } from '../../exception/controller/controllerHandleException'
import { ErrorTypes } from '../../exception/model/ErrorType'
import ResponseException from '../../exception/responseException'

export default async function verifyExistUser(
  request: Request,
  response: Response,
) {
  try {
    const user = await PrismaConnection.user.findUnique({
      where: { email: request.body.email },
    })
    if (!user) throw new BadRequestError('Email ou senha inválidos.')

    const passwordIsMatch = await compare(request.body.password, user.password)

    if (!passwordIsMatch) throw new BadRequestError('Email ou senha inválidos.')
  } catch (error) {
    if (error instanceof BadRequestError) {
      const errorHandler = await ControllerHandleException.handlerError(
        ErrorTypes.BadRequestError,
        error.message,
      )

      return ResponseException({ response, errorHandler })
    }

    const errorHandler = await ControllerHandleException.handlerError(
      ErrorTypes.ServiceUnavailable,
    )

    return ResponseException({ response, errorHandler })
  }
}
