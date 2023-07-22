import { Request, Response } from "express";
import { InternalServerError } from "api/Shared/Utils/Error/ApiErrors";
import ACLUserPermissionsFactory from "../Factories/ACLUserPermissionsFactory";
import UserPermissionsModel from "../Models/UserPermissionsModel";

export default class ACLUserPermissionsController { 
  public async createUserPermissions(request: Request, response: Response) {
    try {
      const {user_id, permissionsIds} = ACLUserPermissionsFactory.fromRequest(request);

      const userPermissions = new UserPermissionsModel().saveUserPermissions({user_id, permissionsIds});

      return response.status(201).json(userPermissions);
    }  catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message);
    }
  }
}
