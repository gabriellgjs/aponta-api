import UserRepository from '@employees/infra/repositories/userRepository'
import ChangeEmailInputData from '@employees/application/dtos/changeEmailInputData'
import User from '@employees/domain/entities/user'

export default class ChangeEmailAction {
  async execute(input: ChangeEmailInputData) {
    const userRepository = new UserRepository()

    const user = new User({
      id: input.id,
      email: input.email,
      password: '',
      roleId: 0,
    })

    return await userRepository.changeEmail(user)
  }
}
