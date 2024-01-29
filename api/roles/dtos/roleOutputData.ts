import { getRoles } from '../types/rolesTypes'

export default class RoleOutputData {
  static responseGetRoles(roles: getRoles) {
    const response = roles.map((role) => {
      const id = role.id
      const name = role.name
      return {
        id,
        name,
      }
    })

    return [...response]
  }
}
