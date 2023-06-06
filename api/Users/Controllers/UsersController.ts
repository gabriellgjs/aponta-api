import CreateUserAction from '@src/User/Application/Actions/CreateUserAction';
import { Request, Response } from 'express';
import CreateUserFactory from '../Factories/CreateUserFactory';
import UsersModel from '../Models/UserModel';

export default class UsersController {
  public async getUser(
    request: Request,
    response: Response,
  ): Promise<Response<string | undefined>> {
    try {
      const usersModel = new UsersModel();

      const { id } = request.params;

      const user = await usersModel.getUserById(Number(id));

      return response.status(200).json(user);
    } catch (error) {
      throw new Error('erro');
    }
  }

  public async getUsers(request: Request, response: Response) {
    const usersModel = new UsersModel();

    const users = await usersModel.getUsers();

    return response.status(200).json(users);
  }

  public async createUser(request: Request, response: Response) {
    try {
      const userAction = new CreateUserAction();

      const userFactory = CreateUserFactory.fromRequest(request);

      const user_id = (await userAction.execute(userFactory)).id;

      return response.status(200).json(user_id);
    } catch (error) {
      throw new Error('erro');
    }
  }
}
