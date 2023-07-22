export default class CreateUserInputData {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly role_id: number,
  ) {}
}
