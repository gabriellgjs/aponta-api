import express, { Router } from "express";
import RolesController from "../Controllers/RolesController";

export default class RolesRoutes {
  private rolesController: RolesController;
  private rolesRoutes: Router;

  constructor() {
    this.rolesController = new RolesController();
    this.rolesRoutes = express.Router();
    this.routes();
  };


   public async routes() {
    const getRole = this.rolesController.getRole.bind(this.rolesController);

    const getRoles = this.rolesController.getRoles.bind(this.rolesController);

    const createRole = this.rolesController.createRole.bind(this.rolesController);

    this.rolesRoutes.get("/role/:id", getRole);

    this.rolesRoutes.get("/roles", getRoles);

    this.rolesRoutes.post("/role", createRole);
  }

  get getRoleRoutes() {
    return this.rolesRoutes
  }
}