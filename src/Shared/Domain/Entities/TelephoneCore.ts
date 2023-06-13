interface TelephoneProps {
  id?: number;
  number: string;
}

export default class TelephoneCore {
  private props: TelephoneProps;

  constructor(props: TelephoneProps) {
    this.props = {
      ...props,
    };
  }

  set number(number: string) {
    this.props.number = number;
  }

  get number(): string {
    return this.props.number;
  }

  get id(): number {
    return this.props.id ? this.props.id : 0;
  }

  set id(id: number) {
    this.props.id = id;
  }
}
