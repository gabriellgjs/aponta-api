import { RoleProps } from './types/rolesProps'

export default class Role {
  private props: RoleProps

  constructor(props: RoleProps) {
    this.props = {
      ...props,
    }
  }

  get id(): number {
    return this.props.id ? this.props.id : 0
  }

  set id(id: number) {
    this.props.id = id
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }
}
