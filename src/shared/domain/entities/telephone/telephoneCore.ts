import { TelephoneProps } from './types/telephoneCoreProps'

export default class TelephoneCore {
  private props: TelephoneProps

  constructor(props: TelephoneProps) {
    this.props = {
      ...props,
    }
  }

  set telephoneNumber(telephoneNumber: string) {
    this.props.telephoneNumber = telephoneNumber
  }

  get telephoneNumber(): string {
    return this.props.telephoneNumber
  }

  get id(): number {
    return this.props.id ? this.props.id : 0
  }

  set id(id: number) {
    this.props.id = id
  }
}
