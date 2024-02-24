export interface AppointmentsProps {
  id?: number
  status?: string
  description?: string
  dataTimeStart: string
  dataTimeEnd: string
  canceledAt?: string

  dentistId: number
  patientId: number

  appointmentId?: number
}
