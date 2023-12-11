import { NextFunction, Request, Response } from 'express'
import { verifyUserActive } from '@authAPI/middlewares/verifyUserActive'
import { verify } from 'jsonwebtoken'
import { Payload } from '@authAPI/types/payload'

export default class AuthorizationRequest {
  async validateAuthorization(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const token = request.headers.authorization

    if (!token)
      return response.status(401).json({
        status: 401,
        message: 'Acesso negado',
      })

    try {
      const secret: string = process.env.JWT_SECRET ?? 'secret'

      const payload = verify(
        token.replace('Bearer ', ''),
        secret,
      ).valueOf() as Payload

      const { id } = payload

      const userActive = await verifyUserActive(id)

      if (userActive.length === 0)
        return response.status(401).json({
          status: 401,
          message: 'Acesso negado',
        })

      response.locals.user = payload
    } catch (error) {
      return response.status(401).json('Token inválido')
    }

    return next()
  }
}
