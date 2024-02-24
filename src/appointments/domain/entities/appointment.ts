import { AppointmentsProps } from '@appointments/domain/entities/types/appointmentsType'

export default class Appointment {
  private props: AppointmentsProps

  constructor(props: AppointmentsProps) {
    this.props = {
      ...props,
      status: props.status ?? 'Ativo',
    }
  }

  get id(): number {
    return this.props.id ?? 0
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

  get description(): string {
    return this.props.description ?? ''
  }

  set description(description: string) {
    this.props.description = description
  }

  get dataTimeStart(): string {
    return this.props.dataTimeStart
  }

  set dataTimeStart(dataTimeStart: string) {
    this.props.dataTimeStart = dataTimeStart
  }

  get dataTimeEnd(): string {
    return this.props.dataTimeEnd
  }

  set dataTimeEnd(dataTimeEnd: string) {
    this.props.dataTimeEnd = dataTimeEnd
  }

  get canceledAt(): string {
    return this.props.canceledAt ?? ''
  }

  set canceledAt(canceledAt: string) {
    this.props.canceledAt = canceledAt
  }

  get dentistId(): number {
    return this.props.dentistId
  }

  set dentistId(dentistId: number) {
    this.props.dentistId = dentistId
  }

  get patientId(): number {
    return this.props.patientId
  }

  set patientId(patientId: number) {
    this.props.patientId = patientId
  }

  get appointmentId(): number {
    return this.props.patientId ?? 0
  }

  set appointmentId(appointmentId: number) {
    this.props.appointmentId = appointmentId
  }
}
