
import { Request, Response } from "express";

import CreateRoleAction from "../../../src/Roles/Application/Actions/CreateRoleAction";
import CreateRoleFactory from "../Factories/CreateRoleFactory";
import RolesModel from "../Models/RolesModel";
import UpdateRoleFactory from "../Factories/UpdateRoleFactory";
import UpdateRoleAction from "../../../src/Roles/Application/Actions/UpdateRoleActiont";
import DeleteRoleAction from "../../../src/Roles/Application/Actions/DeleteRoleAction";
import DeleteRoleFactory from "../Factories/DeleteRoleFactory";

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
    try {
      const roleAction = new CreateRoleAction();

      const roleFactory = CreateRoleFactory.fromRequest(request);

      const roleId = ((await roleAction.execute(roleFactory)).id);

      return response.status(200).json(roleId)
    } catch (error) {
      throw new Error("erro");
    }
  }

  public async updateRole(request: Request, response: Response) {
    try {
      const roleAction = new UpdateRoleAction();
      const rolesModel = new RolesModel();
  
      const userDataInput = UpdateRoleFactory.fromRequest(request);
  
      const actualRole = await rolesModel.getRoleById(userDataInput.id);
    
      const actualRoleInput = UpdateRoleFactory.fromCurrentRole(actualRole);
  
      await roleAction.execute(userDataInput, actualRoleInput);
  
      return response.status(200).json('funfou');
    } catch (error) {
      throw new Error("erro");
    }

  }

  public async deleteRole(request: Request, response: Response) {
    try {
      const roleAction = new DeleteRoleAction();

      const userDataInput = DeleteRoleFactory.fromRequest(request);
  
      await roleAction.execute(userDataInput);
  
      return response.status(200).json('funfou');
    } catch (error) {
      throw new Error("erro");
    }
  }
}