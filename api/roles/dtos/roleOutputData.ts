import { getRoles } from '../types/rolesTypes'

export default class RoleOutputData {
  static responseGetRoles(roles: getRoles) {
    const response = roles.map((role) => {
      const id = role.id
      const name = role.name
      const description = role.description
      return {
        id,
        name,
        description,
        url: `${process.env.BASE_URL}/roles/${id}`,
      }
    })

    return {
      results: response,
    }
  }
}
