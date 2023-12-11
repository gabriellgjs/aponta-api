import { compare } from 'bcryptjs'

export async function comparePassword(
  requestPassword: string,
  userHash: string,
) {
  return await compare(requestPassword, userHash)
}
