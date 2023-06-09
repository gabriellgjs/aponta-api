import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import LoginUserFactory from '../Factories/LoginUserFactory';
import UsersModel from '../Models/UserModel';

interface propsToken {
  id: number;
  email: string;
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
      },
      this.secret,
      {
        expiresIn: this.expiresIn,
        subject: String(user.id),
      },
    );

    return {
      token,
    };
  }

  public async login(request: Request, response: Response) {
    const userFactory = LoginUserFactory.fromRequest(request);

    const usersModel = new UsersModel();

    const userExists = await usersModel.findUser(userFactory.email);

    if (!userExists) throw new Error('Email ou senha inválidos.');

    const passwordIsMatch = await this.comparePassword(
      userExists.password,
      userFactory.password,
    );

    if (!passwordIsMatch) throw new Error('Email ou senha inválidos.');

    return response
      .status(200)
      .send(this.generateTokenAuthenticationByUser(userExists));
  }
}
