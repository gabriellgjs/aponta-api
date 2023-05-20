
import { Request, Response } from "express";
import CreateRoleAction from "../../../src/Roles/Application/Actions/CreateRoleAction";
import CreateRoleFactory from "../Factories/CreateRoleFactory";
import RolesModel from "../Models/RolesModel";


export default class RolesController {
  public async getRole(
    request: Request,
    response: Response
    ): Promise<Response<string | undefined>>{
    try {
      const rolesModel = new RolesModel();
      
      const  { id } = request.params;

      const role = await rolesModel.getRoleById(Number(id));

      return response.status(200).send(JSON.stringify(role));
    } catch (error) {
      throw new Error("erro");
    }
  }

  public async getRoles(request: Request, response: Response) {
    try {
      const rolesModel = new RolesModel();

      const roles = await rolesModel.getRoles();

      return response.status(200).send(JSON.stringify(roles));
    } catch (error) {
      throw new Error("erro");
    }
  }

  public async createRole(request: Request, response: Response) {
      const roleAction = new CreateRoleAction();

      const roleFactory = CreateRoleFactory.fromRequest(request);

      const roleId = ((await roleAction.execute(roleFactory)).id);

      return response.status(200).json(roleId)
  }
}