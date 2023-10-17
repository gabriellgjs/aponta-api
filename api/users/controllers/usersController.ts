import CreateUserAction from '@users/application/actions/createUserAction'
import { Request, Response } from 'express'
import CreateUserFactory from '../factories/createUserFactory'
import UsersModel from '../models/userModel'
import { InternalServerError } from '@apiErrors/errors'

export default class UsersController {
  public async getUser(request: Request, response: Response) {
    try {
      const usersModel = new UsersModel()
      const { id } = request.params
      const user = await usersModel.getUserById(Number(id))

      return response.status(200).json(user)
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async getUsers(request: Request, response: Response) {
    try {
      const usersModel = new UsersModel()
      const users = await usersModel.getUsers()

      return response.status(200).json(users)
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }

  public async createUser(request: Request, response: Response) {
    try {
      const userAction = new CreateUserAction()
      const userFactory = CreateUserFactory.fromRequest(request)
      const userCreated = await userAction.execute(userFactory)

      return response.status(201).json(userCreated?.id)
    } catch (error) {
      if (error instanceof InternalServerError)
        throw new InternalServerError(error.message)
    }
  }
}
