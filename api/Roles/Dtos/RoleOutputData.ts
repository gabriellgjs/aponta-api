import { getRoles } from "../Types/RolesTypes";

export default class RoleOutputData {
  static responseGetRoles(roles: getRoles) {
    const response = roles.map((role) => {
      const id = role.id;
      const name = role.name;
      return {
        id,
        name,
        url: `${process.env.BASE_URL}/roles/${id}`,
      };
    });

    return {
      results: response,
    };
  }
}