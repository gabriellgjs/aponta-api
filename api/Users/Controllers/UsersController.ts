import { Request, Response } from 'express';
import UsersModel from '../Models/UserModel';
import CreateRoleAction from '@src/Roles/Application/Actions/CreateRoleAction';
import DeleteRoleAction from '@src/Roles/Application/Actions/DeleteRoleAction';
import UpdateRoleAction from '@src/Roles/Application/Actions/UpdateRoleActiont';
import CreateRoleFactory from 'api/Roles/Factories/CreateRoleFactory';
import DeleteRoleFactory from 'api/Roles/Factories/DeleteRoleFactory';
import UpdateRoleFactory from 'api/Roles/Factories/UpdateRoleFactory';
import RolesModel from 'api/Roles/Models/RolesModel';
import CreateUserAction from '@src/User/Application/Actions/CreateUserAction';
import CreateUserFactory from '../Factories/CreateUserFactory';

export default class UsersController {
  public async getUser(
    request: Request,
    response: Response,
  ): Promise<Response<string | undefined>> {
    try {
      const usersModel = new UsersModel();

      const { id } = request.params;

      const user = await usersModel.getUserById(Number(id));

      return response.status(200).send(JSON.stringify(user));
    } catch (error) {
      throw new Error('erro');
    }
  }

  public async getUsers(request: Request, response: Response) {
    const usersModel = new UsersModel();

    const users = await usersModel.getUsers();

    return response.status(200).send(JSON.stringify(users));
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
