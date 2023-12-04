import { compare } from 'bcryptjs'

export default async function comparePassword(
  requestPassword: string,
  userHash: string,
) {
  return await compare(requestPassword, userHash)
}
