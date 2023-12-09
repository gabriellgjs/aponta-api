import User from '@employees/domain/entities/user'
import UserModel from '../models/userModel'

export default class UserRepository {
  private userModel: UserModel

  constructor() {
    this.userModel = new UserModel()
  }

  async changeEmail(user: User) {
    return this.userModel.changeEmail(user)
  }

  async changePassword(user: User) {
    return this.userModel.changePassword(user)
  }
}
