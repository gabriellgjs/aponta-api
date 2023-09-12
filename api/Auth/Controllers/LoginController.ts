import { compare } from 'bcryptjs';
import { Request, Response, json } from 'express';
import { sign } from 'jsonwebtoken';

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
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      this.secret,
      {
        expiresIn: this.expiresIn,
        subject: String(user.id),
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

      const res = {
        user: {
          ...responseUser,
          token: this.generateTokenAuthenticationByUser(responseUser),
        }
      }      

      return response.status(200).json(res)
                       
    } catch (error) {
      if (error instanceof InternalServerError)
      throw new InternalServerError(error.message);
    }

  }
}
