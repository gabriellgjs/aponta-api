import User from '../../Domain/Entities/User';
import UsersModel from '../Models/UsersModel';

export default class UserRepository {
  private userModel: UsersModel;

  constructor() {
    this.userModel = new UsersModel();
  }

  async create(user: User): Promise<User> {
    const { id } = await this.userModel.createUser(user);

    user.id = id;

    return user;
  }

  async update(user: User): Promise<void> {
    await this.userModel.updateUser(user);
  }

  async delete(user_id: number): Promise<void> {
    await this.userModel.deleteUser(user_id);
  }
}

//TODO verificar se existe a necessidade de um método save()
