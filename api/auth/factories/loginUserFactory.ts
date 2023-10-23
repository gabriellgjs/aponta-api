import { Request } from 'express'

export default class LoginUserFactory {
  static fromRequest(request: Request) {
    const { email } = request.body
    const { password } = request.body

    return {
      email,
      password,
    }
  }
}
