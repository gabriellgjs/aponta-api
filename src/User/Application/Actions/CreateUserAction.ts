import bcrypt from 'bcryptjs';
import UserRepository from '@src/User/Infra/Repositories/UserRepository';
import User from '../../Domain/Entities/User';
import CreateUserInputData from '../Dtos/CreateUserInputData';

export default class CreateUserAction {
  async execute(input: CreateUserInputData): Promise<User> {
    const userRepository = new UserRepository();

    const user = new User({
      email: input.email,
      password: await this.generateHashPassword(input.password),
    });

    return await userRepository.create(user);
  }

   private async generateHashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }
}
