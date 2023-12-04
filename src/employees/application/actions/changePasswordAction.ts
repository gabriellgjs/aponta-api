import UserRepository from '@employees/infra/repositories/userRepository'
import ChangePasswordInputData from '@employees/application/dtos/changePasswordInputData'
import User from '@employees/domain/entities/user'
import bcrypt from 'bcryptjs'

export default class ChangePasswordAction {
  private async generateHashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  async execute(input: ChangePasswordInputData) {
    const userRepository = new UserRepository()

    const user = new User({
      id: input.id,
      email: '',
      password: await this.generateHashPassword(input.password),
      roleId: 0,
    })

    return await userRepository.changePassword(user)
  }
}
