import bcrypt from 'bcryptjs'
import UserRepository from '@users/infra/repositories/usersRepository'
import User from '@users/domain/entities/user'
import CreateUserInputData from '../dtos/createUserInputData'

export default class CreateUserAction {
  async execute(input: CreateUserInputData) {
    const userRepository = new UserRepository()

    const user = new User({
      email: input.email,
      password: await this.generateHashPassword(input.password),
      roleId: input.roleId,
    })

    return await userRepository.create(user)
  }

  private async generateHashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }
}
