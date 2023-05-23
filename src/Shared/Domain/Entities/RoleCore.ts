interface RoleProps {
  id?: number;
  name: string;
  status?: string;
}

export default class RoleCore {
  private props: RoleProps;

  constructor(props: RoleProps) {
    this.props = {
      ...props,
      status: props.status? props.status: "active"
    };
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get status(): string {
    return this.props.status? this.props.status : "";
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