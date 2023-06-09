import express, { Router } from 'express';
import LoginController from '../Controllers/LoginController';

export default class AuthenticationRoutes {
  private loginController: LoginController;
  private loginRoutes: Router;

  constructor() {
    this.loginRoutes = express.Router();
    this.loginController = new LoginController();
    this.routes();
  }

  public async routes() {
    const login = this.loginController.login.bind(this.loginController);

    this.loginRoutes.post('/', login);
  }

  get loginRoute() {
    return this.loginRoutes;
  }
}

