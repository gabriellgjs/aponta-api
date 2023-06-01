interface TelephoneProps {
  id?: number;
  number: string;
  status?: string;
}

export default class TelephoneCore {
  private props: TelephoneProps;

  constructor(props: TelephoneProps) {
    this.props = {
      ...props,
      status: props.status ? props.status : 'active',
    };
  }

  set number(number: string) {
    this.props.number = number;
  }

  get number(): string {
    return this.props.number;
  }

  get status(): string {
    return this.props.status ? this.props.status : 'a';
  }

  set status(status: string) {
    this.props.status = status;
  }

  get id(): number {
    return this.props.id ? this.props.id : 0;
  }

  set id(id: number) {
    this.props.id = id;
  }
}
