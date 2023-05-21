import { Request } from "express";
import DeleteRoleInputData from "@src/Roles/Application/Dtos/DeleteRoleInputData";

export default class DeleteRoleFactory {
  static fromRequest(request: Request) {
    const { id } = request.params;
    const { name } = request.body;

    return new DeleteRoleInputData(Number(id), name);
  };

}
