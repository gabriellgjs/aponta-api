export interface AppointmentsProps {
  id?: number
  status?: string
  dataTimeStart: string
  dataTimeEnd: string
  canceledAt?: string

  userId: number
  dentistId: number
  patientId: number

  appointmentId?: number
}
