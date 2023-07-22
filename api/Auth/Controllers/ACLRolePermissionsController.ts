import { Request, Response } from "express";
import ACLRolePermissionsFactory from "../Factories/ACLRolePermissionsFactory";
import RolePermissionsModel from "../Models/RolePermissionsModel";
import { InternalServerError } from "api/Shared/Utils/Error/ApiErrors";

export default class ACLRolePermissionsController { 
  public async createRolePermissions(request: Request, response: Response) {
    try {
      const {role_id, permissionsIds} = ACLRolePermissionsFactory.fromRequest(request);

      const RolePermissions = new RolePermissionsModel().saveRolePermissions({role_id, permissionsIds});

      return response.status(201).json(RolePermissions);
    }  catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }
}
