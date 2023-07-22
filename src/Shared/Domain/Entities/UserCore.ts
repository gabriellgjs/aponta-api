interface UserProps {
  id?: number;
  status?: string;
  email: string;
  password: string;
  role_id: number;
}

export default class UserCore {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = {
      ...props,
      status: props.status ?? 'ativo',
    };
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get role_id(): number {
    return this.props.role_id;
  }

  set role_id(role_id: number) {
    this.props.role_id = role_id;
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
    return this.props.status ?? '';
  }

  set status(status: string) {
    this.props.status = status;
  }
}
