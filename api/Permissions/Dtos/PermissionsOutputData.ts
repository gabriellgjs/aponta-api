import { getPermissions } from "../Types/PermissionsTypes";

export default class PermissionsOutputData {
  static responseGetPermissions(permissions: getPermissions) {
    const response = permissions.map((permission) => {
      const id = permission.id;
      const name = permission.name;
      return {
        id,
        name,
        url: `${process.env.BASE_URL}/permissions/${id}`,
      };
    });

    return {
      results: response,
    };
  }
}