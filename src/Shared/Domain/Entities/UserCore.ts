interface UserProps {
  id?: number;
  status?: string;
  email: string;
  password: string;
}

export default class UserCore {
  private props: UserProps;

  constructor(props: UserProps) {
    const isValidePassword = this.validatePassword(props.password);

    if (!isValidePassword) {
      throw new Error('Password is incorrect length');
    }

    this.props = {
      ...props,
    };
  }

  private validatePassword(password: string): boolean {
    return password.length >= 6 && password.length <= 20;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get id(): number {
    return this.props.id ? this.props.id : 0;
  }

  set id(id: number) {
    this.props.id = id;
  }

  get status(): string {
    return this.props.status ? this.props.status : '';
  }

  set status(status: string) {
    this.props.status = status;
  }
}
