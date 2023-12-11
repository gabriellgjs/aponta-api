import PeopleCore from '@shared/domain/entities/people/peopleCore'
import { PatientCoreProps } from './types/patientCoreProps'

export default class PatientCore extends PeopleCore {
  protected props: PatientCoreProps

  constructor(props: PatientCoreProps) {
    super({ ...props })

    this.props = {
      ...props,
      status: props.status ?? 'Ativo',
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
