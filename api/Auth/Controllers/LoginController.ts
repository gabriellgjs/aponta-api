import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import jwt, { sign } from 'jsonwebtoken';

import { BadRequestError, InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';
import LoginUserFactory from '../Factories/LoginUserFactory';
import LoginModel from '../Models/LoginModel';

interface propsToken {
  id: number;
  email: string;
  name: string;
}

export default class LoginController {
  private secret: string = process.env.JWT_SECRET ?? 'secret';
  private expiresIn: string = process.env.EXPIRES_IN ?? '24h';

  private async comparePassword(
    password_hash: string,
    password_request: string,
  ) {
    return await compare(password_request, password_hash);
  }

  private generateTokenAuthenticationByUser(user: propsToken) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      this.secret,
      {
        algorithm: "HS256",
        expiresIn: this.expiresIn,
      },
      );
      
    return token
  }

  public async login(request: Request, response: Response) {
    try {
      const userFactory = LoginUserFactory.fromRequest(request);
      const loginModel = new LoginModel();
      const userExists = await loginModel.findUser(userFactory.email);
      
      if (!userExists) throw new BadRequestError('Email ou senha inválidos.');
      
      const passwordIsMatch = await this.comparePassword(
        userExists.password,
        userFactory.password,
        );
        
        if (!passwordIsMatch) throw new BadRequestError('Email ou senha inválidos.');

        const responseUser = {
          id: userExists.id,
          email: userExists.email,
          name: userExists.employees[0].people.name,
        }
      
      const token = this.generateTokenAuthenticationByUser(responseUser)

      const res = {
        user: {
          ...responseUser,
        },
        token,
      }      
      return response.status(200).json(res).end
                       
    } catch (error) {
      if (error instanceof InternalServerError)
      throw new InternalServerError(error.message);
    }

  }
}
