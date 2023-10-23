import { PatientEmployeeCoreProps } from './types/patientCoreProps'

export default class PatientCoreEmployee {
  private props: PatientEmployeeCoreProps

  constructor(props: PatientEmployeeCoreProps) {
    this.props = {
      ...props,
      status: props.status ?? 'ativo',
    }
  }

  get id(): number {
    return this.props.id ? this.props.id : 0
  }

  set id(id: number) {
    this.props.id = id
  }

  get status(): string {
    return this.props.status ?? ''
  }

  set status(status: string) {
    this.props.status = status
  }
}
