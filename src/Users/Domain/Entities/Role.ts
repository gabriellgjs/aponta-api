interface RoleProps {
  name: string;
}

export class Role {
  private props: RoleProps;

  constructor(props: RoleProps) {
    this.props = {
      ...props,
    };
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }
}