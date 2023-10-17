import { PermissionProps } from './types/permissionsProps'

export default class Permission {
  private props: PermissionProps

  constructor(props: PermissionProps) {
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

  get description(): string {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }
}
