interface UserProps {
  email: string;
  password: string;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    const isValidePassword = this.validatePassword(props.password);

    if(!isValidePassword) {
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
}