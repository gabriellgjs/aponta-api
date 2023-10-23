import User from '@users/domain/entities/user'
import UsersModel from '../models/usersModel'

export default class UserRepository {
  private userModel: UsersModel

  constructor() {
    this.userModel = new UsersModel()
  }

  async save(user: User) {
    if (user.id) {
      // return this.update(role);
    }

    return this.create(user)
  }

  async create(user: User) {
    try {
      const id = await this.userModel.createUser(user)

      user.id = id

      return user
    } catch (error) {}
  }

  async update(user: User): Promise<void> {
    await this.userModel.updateUser(user)
  }

  async delete(userId: number): Promise<void> {
    await this.userModel.deleteUser(userId)
  }
}
