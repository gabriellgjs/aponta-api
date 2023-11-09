import {compare} from 'bcryptjs'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'

import LoginUserFactory from '../factories/loginUserFactory'
import LoginModel from '../models/loginModel'
import {InternalServerError, NotFoundError} from '@apiErrors/errors'

interface propsToken {
  id: number
  email: string
  name: string
}

export default class LoginController {
  private secret: string = process.env.JWT_SECRET ?? 'secret'
  private expiresIn: string = process.env.EXPIRES_IN ?? '24h'

  private async comparePassword(passwordHash: string, passwordRequest: string) {
    return await compare(passwordRequest, passwordHash)
  }

  private generateTokenAuthenticationByUser(user: propsToken) {
    return jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        this.secret,
        {
          algorithm: 'HS256',
          expiresIn: this.expiresIn,
        },
    )
  }

  public async login(request: Request, response: Response) {
    try {
      const userFactory = LoginUserFactory.fromRequest(request)
      const loginModel = new LoginModel()
      const userExists = await loginModel.findUser(userFactory.email)

      if (!userExists) throw new NotFoundError('Email ou senha inválidos.')

      const passwordIsMatch = await this.comparePassword(
        userExists.password,
        userFactory.password,
      )

      if (!passwordIsMatch)
        throw new NotFoundError('Email ou senha inválidos.')

      const responseUser = {
        id: userExists.id,
        email: userExists.email,
        name: userExists.employee.people.name,
      }

      const token = this.generateTokenAuthenticationByUser(responseUser)

      const res = {
        user: {
          ...responseUser,
          token,
        },
      }
      return response.status(200).json(res).end
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }
}
