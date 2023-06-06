import express, { Router } from 'express';
import UsersController from '../Controllers/UsersController';

export default class UsersRoutes {
  private usersController: UsersController;
  private usersRoutes: Router;

  constructor() {
    this.usersController = new UsersController();
    this.usersRoutes = express.Router();
    this.routes();
  }

  public async routes() {
    const getUser= this.usersController.getUser.bind(this.usersController);

    const getUsers = this.usersController.getUsers.bind(this.usersController);

    const createUser = this.usersController.createUser.bind(
      this.usersController,
    );

    this.usersRoutes.get('/:id', getUser);

    this.usersRoutes.get('/', getUsers);

    this.usersRoutes.post('/', createUser);

  }

  get UsersRoutes() {
    return this.usersRoutes;
  }
}

//TODO middleawers
